const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const createAction = require('./actions.factory');

const {
  ADD,
  REMOVE,
  HALT,
  MOVE,
  RESUME,
  SCHEDULE,
  SKIP,
  TERMINATE,
  START,
  STOP,
  SET
} = require('../commands');

describe('createAction', function() {
  const usernameToUserInfo = new Map([
    ['@eva', 1]
  ]);
  const myUserId = 1;
  const events = ['artris', 'feeling lucky'];
<<<<<<< f9d99468b8790ab1e4da2b5cffd0195e6b249b36
  let add, remove, halt, move, resume, schedule, skip, terminate, start, stop;
=======
  const zone = 'UTC';
  let add, remove, halt, move, resume, schedule, skip, terminate, start, stop, set;
>>>>>>> adds set url command
  let actions;

  beforeEach(() => {
    add = sinon.spy();
    remove = sinon.spy();
    halt = sinon.spy();
    move = sinon.spy();
    resume = sinon.spy();
    schedule = sinon.spy();
    skip = sinon.spy();
    terminate = sinon.spy();
    stop = sinon.spy();
    start = sinon.spy();
    set = sinon.spy();
    actions = createAction(
      add,
      remove,
      halt,
      move,
      resume,
      schedule,
      skip,
      terminate,
      start,
      stop,
      set,
      ADD,
      REMOVE,
      HALT,
      MOVE,
      RESUME,
      SCHEDULE,
      SKIP,
      TERMINATE,
      START,
      STOP,
      SET
    );
  });

  it('should call "add" with the right arguments when command is ADD', function() {
    actions({
        type: ADD
      },
      usernameToUserInfo,
      myUserId,
      events
    );
    chai.expect(add).to.have.been.calledWith({
        type: ADD
      },
      usernameToUserInfo,
      myUserId,
      events
    );
  });

  it('should call "remove" with the right arguments when command is REMOVE', function() {
    actions({
        type: REMOVE
      },
      usernameToUserInfo,
      myUserId,
      events
    );
    chai.expect(remove).to.have.been.calledWith({
        type: REMOVE
      },
      usernameToUserInfo,
      myUserId,
      events
    );
  });

  it('should call "halt" with the right arguments when command is HALT', function() {
    actions({
        type: HALT
      },
      usernameToUserInfo,
      myUserId,
      events
    );
    chai.expect(halt).to.have.been.calledWith({
        type: HALT
      },
      events
    );
  });

  it('should call "move" with the right arguments when command is MOVE', function() {
    actions({
        type: MOVE
      },
      usernameToUserInfo,
      myUserId,
      events,
    );
    chai.expect(move).to.have.been.calledWith({
        type: MOVE
      },
      events,
    );
  });

  it('should call "resume" with the right arguments when command is RESUME', function() {
    actions({
        type: RESUME
      },
      usernameToUserInfo,
      myUserId,
      events
    );
    chai.expect(resume).to.have.been.calledWith({
        type: RESUME
      },
      events
    );
  });

  it('should call "schedule" with the right arguments when command is SCHEDULE', function() {
    actions({
        type: SCHEDULE
      },
      usernameToUserInfo,
      myUserId,
      events
    );
    chai.expect(schedule).to.have.been.calledWith({
        type: SCHEDULE
      },
      usernameToUserInfo,
      myUserId,
      events
    );
  });

  it('should call "skip" with the right arguments when command is SKIP', function() {
    actions({
        type: SKIP
      },
      usernameToUserInfo,
      myUserId,
      events
    );
    chai.expect(skip).to.have.been.calledWith({
        type: SKIP
      },
      usernameToUserInfo,
      myUserId,
      events
    );
  });

  it('should call "terminate" with the right arguments when command is TERMINATE', function() {
    actions({
        type: TERMINATE
      },
      usernameToUserInfo,
      myUserId,
      events
    );
    chai.expect(terminate).to.have.been.calledWith({
        type: TERMINATE
      },
      events
    );
  });

  it('should call "stop" with the right arguments when command is STOP', function() {
    actions({
        type: STOP
      },
      usernameToUserInfo,
      myUserId,
      events
    );
    chai.expect(stop).to.have.been.calledWith({
        type: STOP
      },
      usernameToUserInfo,
      myUserId,
      events
    );
  });

  it('should call "start" with the right arguments when command is START', function() {
    actions({
        type: START
      },
      usernameToUserInfo,
      myUserId,
      events
    );
    chai.expect(start).to.have.been.calledWith({
        type: START
      },
      usernameToUserInfo,
      myUserId,
      events
    );
  });

  it('should call "set" with the right arguments when command is SET', function() {
    actions({
        type: SET
      },
      usernameToUserInfo,
      myUserId,
      events,
      zone
    );
    chai.expect(set).to.have.been.calledWith({
        type: SET
      },
      events
    );
  });



});
