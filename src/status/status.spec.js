const chai = require('chai');
const sinon = require('sinon');
const { stripIndent } = require('common-tags');

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const expect = chai.expect;

const statusFactory = require('./status.factory');
const mockedLogs = require('./mocked-logs.json');

describe('status.fatory', function() {
  const team_id = 'ARTris';
  const logProvider = team_id =>
    Promise.resolve(mockedLogs.filter(n => n.team_id === team_id));

  it('should calculate the overall status for each member', function(done) {
    const logger = { log: sinon.spy() };
    const status = statusFactory(logProvider, logger);
    const expected = [
      { id: '@eva', notified: 3, participated: 2 },
      { id: '@grace', notified: 4, participated: 2 },
      { id: '@dt', notified: 4, participated: 2 }
    ];

    status(team_id)
      .then(membersStatus => {
        expected.forEach(expectedStatus => {
          const actualStatus = membersStatus.get(expectedStatus.id);
          expect(actualStatus).to.deep.equal(expectedStatus);
        });
        done();
      })
      .catch(err => done(err));
  });

  it('should log and rethrow when it fails to calculate the status', function(done) {
    const logProvider = team_id => Promise.reject('Logs not accessible');
    const logSpy = sinon.spy();
    const logger = { log: logSpy };
    const status = statusFactory(logProvider, logger);
    status('ARTris')
      .catch(err => {
        expect(err).to.equal('Logs not accessible');
        expect(logSpy).to.have.been.calledOnce;
        done();
      })
      .catch(err => done(err));
  });
});
