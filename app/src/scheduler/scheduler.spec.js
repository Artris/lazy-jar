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
      frequency: 'EVERYDAY',
      time: {
        hh: 6,
        mm: 30,
        zone: 'America/Vancouver'
      }
    },
    {
      team_id: 'T_ID_2',
      event_id: 'E_ID_2',
      frequency: 'WORKDAYS',
      time: {
        hh: 10,
        mm: 00,
        zone: 'America/Vancouver'
      }
    }
  ];

  let schedule, Job, toCronString, scheduler;
  beforeEach(function() {
    schedule = {
      scheduleJob: sinon.spy(),
      scheduledJobs: {
        'T_ID_1-E_ID_1': { cancel: sinon.spy() },
        'T_ID_2-E_ID_2': { cancel: sinon.spy() }
      }
    };

    Job = sinon.stub();
    Job.withArgs('T_ID_1', 'E_ID_1').returns('Some Job #1');

    Job.withArgs('T_ID_2', 'E_ID_2').returns('Some Job #2');

    toCronString = sinon.stub();
    toCronString
      .withArgs({
        frequency: 'EVERYDAY',
        time: {
          hh: 6,
          mm: 30,
          zone: 'America/Vancouver'
        }
      })
      .returns('30 6 * * *');

    toCronString
      .withArgs({
        frequency: 'WORKDAYS',
        time: {
          hh: 10,
          mm: 00,
          zone: 'America/Vancouver'
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
      'America/Vancouver',
      'Some Job #1'
    );

    expect(schedule.scheduleJob).to.have.been.calledWith(
      'T_ID_2-E_ID_2',
      '0 10 * * 1-5',
      'America/Vancouver',
      'Some Job #2'
    );
  });

  it('should support canceling existing events', function() {
    scheduler.cancel(events);
    expect(schedule.scheduledJobs['T_ID_1-E_ID_1'].cancel).to.have.been
      .calledOnce;
    expect(schedule.scheduledJobs['T_ID_2-E_ID_2'].cancel).to.have.been
      .calledOnce;
  });

  it('should support rescheduling existing events', function() {
    scheduler.reschedule(events);
    expect(schedule.scheduleJob).to.have.been.calledWith(
      'T_ID_1-E_ID_1',
      '30 6 * * *',
      'America/Vancouver',
      'Some Job #1',
    );

    expect(schedule.scheduleJob).to.have.been.calledWith(
      'T_ID_2-E_ID_2',
      '0 10 * * 1-5',
      'America/Vancouver',
      'Some Job #2'
    );
    expect(schedule.scheduledJobs['T_ID_1-E_ID_1'].cancel).to.have.been
      .calledOnce;
    expect(schedule.scheduledJobs['T_ID_2-E_ID_2'].cancel).to.have.been
      .calledOnce;
  });
});
