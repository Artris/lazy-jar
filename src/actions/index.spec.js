const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const createAction = require('../actions/actions.factory');

const {
  ADD,
  REMOVE,
  HALT,
  MOVE,
  RESUME,
  SCHEDULE,
  SKIP,
  STATUS,
  TERMINATE,
  START,
  STOP
} = require('../commands');

describe('createAction', function () {
  const usernameToIds = new Map([
    ['@eva', 1]
  ]);
  const myUserId = 1;
  const events = ['artris', 'feeling lucky'];
  const zone = 'UTC';
  let add, remove, halt, move, resume, schedule, skip, terminate, start, stop;
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
      ADD,
      REMOVE,
      HALT,
      MOVE,
      RESUME,
      SCHEDULE,
      SKIP,
      STATUS,
      TERMINATE,
      START,
      STOP
    );
  });

  it('should call "add" with the right arguments when command is ADD', function () {
    actions({
      type: ADD
    }, usernameToIds, myUserId, events, zone);
    chai
      .expect(add)
      .to.have.been.calledWith({
        type: ADD
      }, usernameToIds, myUserId, events);
  });

  it('should call "remove" with the right arguments when command is REMOVE', function () {
    actions({
      type: REMOVE
    }, usernameToIds, myUserId, events, zone);
    chai
      .expect(remove)
      .to.have.been.calledWith({
          type: REMOVE
        },
        usernameToIds,
        myUserId,
        events
      );
  });

  it('should call "halt" with the right arguments when command is HALT', function () {
    actions({
      type: HALT
    }, usernameToIds, myUserId, events, zone);
    chai.expect(halt).to.have.been.calledWith({
      type: HALT
    }, events);
  });

  it('should call "move" with the right arguments when command is MOVE', function () {
    actions({
      type: MOVE
    }, usernameToIds, myUserId, events, zone);
    chai.expect(move).to.have.been.calledWith({
      type: MOVE
    }, events, zone);
  });

  it('should call "resume" with the right arguments when command is RESUME', function () {
    actions({
      type: RESUME
    }, usernameToIds, myUserId, events, zone);
    chai.expect(resume).to.have.been.calledWith({
      type: RESUME
    }, events);
  });

  it('should call "schedule" with the right arguments when command is SCHEDULE', function () {
    actions({
      type: SCHEDULE
    }, usernameToIds, myUserId, events, zone);
    chai
      .expect(schedule)
      .to.have.been.calledWith({
          type: SCHEDULE
        },
        usernameToIds,
        myUserId,
        events,
        zone
      );
  });

  it('should call "skip" with the right arguments when command is SKIP', function () {
    actions({
      type: SKIP
    }, usernameToIds, myUserId, events, zone);
    chai
      .expect(skip)
      .to.have.been.calledWith({
        type: SKIP
      }, usernameToIds, myUserId, events);
  });

  it('should call "terminate" with the right arguments when command is TERMINATE', function () {
    actions({
      type: TERMINATE
    }, usernameToIds, myUserId, events, zone);
    chai.expect(terminate).to.have.been.calledWith({
      type: TERMINATE
    }, events);
  });

  it('should call "stop" with the right arguments when command is STOP', function () {
    actions({
      type: STOP
    }, usernameToIds, myUserId, events, zone);
    chai.expect(stop).to.have.been.calledWith({
      type: STOP
    }, usernameToIds, myUserId, events);
  });

  it('should call "start" with the right arguments when command is START', function () {
    actions({
      type: START
    }, usernameToIds, myUserId, events, zone);
    chai.expect(start).to.have.been.calledWith({
      type: START
    }, usernameToIds, myUserId, events);
  });

});