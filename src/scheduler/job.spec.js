const chai = require('chai');
const sinon = require('sinon');
const { stripIndent } = require('common-tags');

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const expect = chai.expect;

const jobFactory = require('./job.factory');

describe('job.factory', function() {
  const team_id = 'T_ID',
    event_id = 'E_ID',
    fireDate = new Date('2018-02-20');
  it('should notify the active members', function(done) {
    const getEvent = sinon
      .stub()
      .withArgs('T_ID', 'E_ID')
      .returns(
        Promise.resolve({
          members: [
            { ignore: true, id: 'M_ID_1' },
            { ignore: false, skip_until: new Date('2018-01-20'), id: 'M_ID_2' },
            { ignore: false, skip_until: new Date('2018-04-20'), id: 'M_ID_3' },
            { id: 'M_ID_4' }
          ]
        })
      );

    const isBefore = (a, b) => a < b;
    const notifyUsers = sinon.stub().resolves();

    const Job = jobFactory(getEvent, notifyUsers, isBefore);
    const job = Job(team_id, event_id);

    job(fireDate)
      .then(() => {
        expect(notifyUsers).to.have.been.calledWith('T_ID', [
          'M_ID_2',
          'M_ID_4'
        ]);
        done();
      })
      .catch(err => done(err));
  });

  it('should log if it fails to find the event', function(done) {
    const getEvent = sinon
      .stub()
      .withArgs('T_ID', 'E_ID')
      .rejects("Can't Find the event");

    const log = sinon.spy();
    const logger = { log };

    const Job = jobFactory(getEvent, undefined, undefined, logger);
    const job = Job(team_id, event_id);

    job(fireDate)
      .then(() => {
        expect(log).to.have.been.calledWith({
          level: 'error',
          message: stripIndent`
          failed to execute a job
          team_id:  T_ID
          event_id: E_ID
          error:    Can't Find the event
        `
        });
        done();
      })
      .catch(err => done(err));
  });
});
