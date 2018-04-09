const {
  ADD,
  REMOVE,
  HALT,
  MOVE,
  RESUME,
  SCHEDULE,
  TERMINATE,
  SKIP,
  START,
  STOP
} = require('../commands');

function lazyJar(action, state = {}) {
  const { event } = action;
  switch (action.type) {
    case SCHEDULE:
      return Object.assign({}, state, {
        event_id: event,
        time_to_respond: 900,
        members: action.userInfos.map(info =>
          Object.assign({}, info, { ignore: false })
        ),
        frequency: action.frequency,
        time: action.time,
        halted: false
      });
    case TERMINATE:
      return {};
    case ADD:
    case REMOVE:
    case MOVE:
    case HALT:
    case RESUME:
    case SKIP:
    case START:
    case STOP:
      const { members, frequency, time, halted } = state;

      return Object.assign({}, state, {
        event_id: event,
        time_to_respond: 900,
        members: processUserIds(members, action),
        frequency: processFrequency(frequency, action),
        time: processTime(time, action),
        halted: isHalted(halted, action)
      });
    default:
      return state;
  }
}

function processUserIds(prevMembers, action) {
  switch (action.type) {
    case ADD:
      /*return new array of ids without duplicates*/
      return prevMembers
        .concat(
          action.userInfos.map(info =>
            Object.assign({}, info, { ignore: false })
          )
        )
        .filter((member, index, arr) => {
          return (
            index ===
            arr.findIndex(object => {
              return object.user_id === member.user_id;
            })
          );
        });
    case REMOVE:
      const toRemoveUserIds = action.userInfos.map(e => e.user_id);
      return prevMembers.filter(member => {
        return !toRemoveUserIds.includes(member.user_id);
      });
    case SKIP:
      return prevMembers.map(member => {
        return member.user_id === action.userInfo.user_id
          ? Object.assign({}, member, {
              skip_until: action.skip_until
            })
          : member;
      });
    case START:
      return prevMembers.map(member => {
        if (member.user_id === action.userInfo.user_id) {
          return {
            user_id: member.user_id,
            user_im_id: member.user_im_id,
            ignore: false
          };
        } else {
          return member;
        }
      });
    case STOP:
      return prevMembers.map(member => {
        return member.user_id === action.userInfo.user_id
          ? Object.assign({}, member, { ignore: true })
          : member;
      });
    default:
      return prevMembers;
  }
}

function processFrequency(prevFrequency, action) {
  switch (action.type) {
    case MOVE:
      return action.frequency;
    default:
      return prevFrequency;
  }
}

function processTime(prevTime = {}, action) {
  switch (action.type) {
    case MOVE:
      return action.time;
    default:
      return prevTime;
  }
}

function isHalted(halted = false, action) {
  switch (action.type) {
    case RESUME:
      return false;
    case HALT:
      return true;
    default:
      return halted;
  }
}

module.exports = lazyJar;
