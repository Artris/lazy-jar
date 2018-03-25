const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const {
  split
} = require('./helpers/helpers');
const createParser = require('../parser/parser.factory');

const {
  ADD,
  REMOVE,
  MOVE,
  SCHEDULE,
  SKIP,
  STATUS,
  HALT,
  TERMINATE,
  START,
  STOP
} = require('../commands');

describe('parser factory', function () {
  let parseScheduleCommand,
    parseAddCommand,
    parseRemoveCommand,
    parseMoveCommand,
    parseSkipCommand,
    parseStatusCommand,
    parseHaltCommand,
    parseResumeCommand,
    parseTerminateCommand,
    parseStartCommand,
    parseStopCommand

  let parse;
  beforeEach(() => {
    parseScheduleCommand = sinon.spy();
    parseAddCommand = sinon.spy();
    parseRemoveCommand = sinon.spy();
    parseMoveCommand = sinon.spy();
    parseSkipCommand = sinon.spy();
    parseStatusCommand = sinon.spy();
    parseHaltCommand = sinon.spy();
    parseResumeCommand = sinon.spy();
    parseTerminateCommand = sinon.spy();
    parseStopCommand = sinon.spy();
    parseStartCommand = sinon.spy();

    parse = createParser(
      split,
      parseScheduleCommand,
      parseAddCommand,
      parseRemoveCommand,
      parseMoveCommand,
      parseSkipCommand,
      parseStatusCommand,
      parseHaltCommand,
      parseResumeCommand,
      parseTerminateCommand,
      parseStartCommand,
      parseStopCommand
    );
  });

  it('should invoke "parseScheduleCommand" when command type is schedule', () => {
    const command = 'schedule ...';
    parse(command);
    chai.expect(parseScheduleCommand).to.have.been.calledWith(command);
  });

  it('should invoke "parseMoveCommand" when command type is move', () => {
    const command = 'move ...';
    parse(command);
    chai.expect(parseMoveCommand).to.have.been.calledWith(command);
  });

  it('should invoke "parseAddCommand" when command type is add', () => {
    const command = 'add ...';
    parse(command);
    chai.expect(parseAddCommand).to.have.been.calledWith(command);
  });

  it('should invoke "parseRemoveCommand" when command type is remove', () => {
    const command = 'remove ...';
    parse(command);
    chai.expect(parseRemoveCommand).to.have.been.calledWith(command);
  });

  it('should invoke "parseHaltCommand" when command type is halt', () => {
    const command = 'halt ...';
    parse(command);
    chai.expect(parseHaltCommand).to.have.been.calledWith(command);
  });

  it('should invoke "parseResumeCommand" when command type is resume', () => {
    const command = 'resume ...';
    parse(command);
    chai.expect(parseResumeCommand).to.have.been.calledWith(command);
  });

  it('should invoke "parseTerminateCommand" when command type is terminate', () => {
    const command = 'terminate ...';
    parse(command);
    chai.expect(parseTerminateCommand).to.have.been.calledWith(command);
  });

  it('should invoke "parseSkipCommand" when command type is skip', () => {
    const command = '... will skip ...';
    parse(command);
    chai.expect(parseSkipCommand).to.have.been.calledWith(command);
  });

  it('should invoke "parseSkipCommand" when command type is start', () => {
    const command = 'start notifying ...';
    parse(command);
    chai.expect(parseStartCommand).to.have.been.calledWith(command);
  });

  it('should invoke "parseSkipCommand" when command type is stop', () => {
    const command = 'stop notifying ...';
    parse(command);
    chai.expect(parseStopCommand).to.have.been.calledWith(command);
  });

  it('should throw when the command is unknown', () => {
    const command = 'SomeUnknownCommand ...';
    chai
      .expect(() => {
        parse(command);
      })
      .to.throw('unkown command');
  });
});