const chai = require('chai');
const sinon = require('sinon');
const { stripIndent } = require('common-tags');

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const expect = chai.expect;

const statusFactory = require('./status.factory');
const mockedLogs = require('./mocked-logs.json');

const moment = require('moment');

const occuredWithinCurrentWeek = (date) => {
  return true
}

const occuredWithinCurrentMonth = (date) => {
  return true
}

describe('status.fatory', function() {
  const team_id = 'ARTris';
  const logProvider = ({ team_id }) =>
    Promise.resolve(mockedLogs.filter(n => n.team_id === team_id));

it('should calculate the overall status for each member', function (done) {
    const logger = {
        log: sinon.spy()
    };
    const status = statusFactory(logProvider, logger, occuredWithinCurrentWeek, occuredWithinCurrentMonth, moment);
    const expected = [{
            id: '@eva',
            notified: 6,
            participated: 4,
            notifiedCurrentWeek: 6,
            participatedCurrentWeek: 4,
            notifiedCurrentMonth: 6,
            participatedCurrentMonth: 4
        },
        {
            id: '@grace',
            notified: 8,
            participated: 4,
            notifiedCurrentWeek: 8,
            participatedCurrentWeek: 4,
            notifiedCurrentMonth: 8,
            participatedCurrentMonth: 4
        },
        {
            id: '@dt',
            notified: 8,
            participated: 4,
            notifiedCurrentWeek: 8,
            participatedCurrentWeek: 4,
            notifiedCurrentMonth: 8,
            participatedCurrentMonth: 4
        }
    ];
    status(team_id)
        .then(({
            memberStatus
        }) => {
            expected.forEach(expectedStatus => {
                const actualStatus = memberStatus.get(expectedStatus.id);
                expect(actualStatus).to.deep.equal(expectedStatus);
            });
            done();
        })
        .catch(err => done(err));
});

  it('should log and rethrow when it fails to calculate the status', function(done) {
    const logProvider = ({ team_id }) => Promise.reject('Logs not accessible');
    const logSpy = sinon.spy();
    const logger = { log: logSpy };
    const status = statusFactory(logProvider, logger, occuredWithinCurrentWeek, occuredWithinCurrentMonth, moment);
    status(team_id)
      .catch(err => {
        expect(err).to.equal('Logs not accessible');
        expect(logSpy).to.have.been.calledOnce;
        done();
      })
      .catch(err => done(err));
  });

  it('should calculate metrics for specific event (lazy-jar)', function(done) {
    const logger = { log: sinon.spy() };
    const status = statusFactory(logProvider, logger, occuredWithinCurrentWeek, occuredWithinCurrentMonth, moment);
    const expected = [
      { event_id: 'lazy-jar', notified: 22, participated: 12 },
    ];

    status(team_id)
      .then(({ eventStatus }) => {
        expected.forEach(expectedStatus => {
          const actualStatus = eventStatus.get(expectedStatus.event_id);
          expect(actualStatus).to.deep.equal(expectedStatus);
        });
        done();
      })
      .catch(err => done(err));
  });
});
