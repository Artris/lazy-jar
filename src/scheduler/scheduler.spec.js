const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const expect = chai.expect;

const schedulerFactory = require('./scheduler.factory');

describe('scheduler', function() {
  const events = [
    {
      team_id: 'T_ID_1',
      event_id: 'E_ID_1',
      spec: {
        frequency: 'EVERYDAY',
        time: {
          hh: 6,
          mm: 30
        }
      }
    },
    {
      team_id: 'T_ID_2',
      event_id: 'E_ID_2',
      spec: {
        frequency: 'WORKDAYS',
        time: {
          hh: 10,
          mm: 00
        }
      }
    }
  ];

  let schedule, Job, toCronString, scheduler;
  beforeEach(function() {
    schedule = {
      scheduleJob: sinon.spy(),
      cancel: sinon.spy()
    };

    Job = sinon.stub();
    Job.withArgs({
      team_id: 'T_ID_1',
      event_id: 'E_ID_1'
    }).returns('Some Job #1');

    Job.withArgs({
      team_id: 'T_ID_2',
      event_id: 'E_ID_2'
    }).returns('Some Job #2');

    toCronString = sinon.stub();
    toCronString
      .withArgs({
        frequency: 'EVERYDAY',
        time: {
          hh: 6,
          mm: 30
        }
      })
      .returns('30 6 * * *');

    toCronString
      .withArgs({
        frequency: 'WORKDAYS',
        time: {
          hh: 10,
          mm: 00
        }
      })
      .returns('0 10 * * 1-5');

    scheduler = schedulerFactory(schedule, toCronString, Job);
  });

  it('should support adding new events', function() {
    scheduler.add(events);
    expect(schedule.scheduleJob).to.have.been.calledWith(
      'T_ID_1-E_ID_1',
      '30 6 * * *',
      'Some Job #1'
    );

    expect(schedule.scheduleJob).to.have.been.calledWith(
      'T_ID_2-E_ID_2',
      '0 10 * * 1-5',
      'Some Job #2'
    );
  });

  it('should support canceling existing events', function() {
    scheduler.cancel(events);
    expect(schedule.cancel).to.have.been.calledWith('T_ID_1-E_ID_1');
    expect(schedule.cancel).to.have.been.calledWith('T_ID_2-E_ID_2');
  });

  it('should support rescheduling existing events', function() {
    scheduler.reschedule(events);
    expect(schedule.scheduleJob).to.have.been.calledWith(
      'T_ID_1-E_ID_1',
      '30 6 * * *',
      'Some Job #1'
    );

    expect(schedule.scheduleJob).to.have.been.calledWith(
      'T_ID_2-E_ID_2',
      '0 10 * * 1-5',
      'Some Job #2'
    );
    expect(schedule.cancel).to.have.been.calledWith('T_ID_1-E_ID_1');
    expect(schedule.cancel).to.have.been.calledWith('T_ID_2-E_ID_2');
  });
});
