const assert = require('assert');
const move = require('./move');
const {
  MOVE
} = require('../../commands');

describe('move action', function () {
  it('should correctly return a move action', function () {
    const events = new Set(['artris', 'lazy-jar']);
    const parsedCommand = {
      type: MOVE,
      event: 'artris',
      to: '6:30 am everyday',
      zone: 'America/Vancouver'
    };
    const expected = {
      type: MOVE,
      event: 'artris',
      time: {
        hh: 6,
        mm: 30,
        zone: 'America/Vancouver'
      },
      frequency: 'EVERYDAY'
    };
    const result = move(parsedCommand, events);
    assert.deepEqual(result, expected);
  });

  it('should throw an error given incorrect time', function () {
    const events = new Set(['artris', 'lazy-jar']);
    const parsedCommand = {
      type: MOVE,
      event: 'artris',
      to: '6 everyday',
      zone: 'America/Vancouver'
    };
    assert.throws(
      () => move(parsedCommand, events),
      /incorrectly formatted time/
    );
  });

  it('should throw an error given incorrect frequency', function () {
    const events = new Set(['artris', 'lazy-jar']);
    const parsedCommand = {
      type: MOVE,
      event: 'artris',
      to: '6:00 am once in a while',
      zone: 'America/Vancouver'
    };
    assert.throws(
      () => move(parsedCommand, events),
      /incorrect frequency/
    );
  });

  it('should throw an error given an event that does not exist', function () {
    const events = new Set(['lazy-jar']);
    const parsedCommand = {
      type: MOVE,
      event: 'artris',
      to: '6:00 am everyday',
      zone: 'America/Vancouver'
    };
    assert.throws(
      () => move(parsedCommand, events),
      /the project specified does not exist/
    );
  });
  it('should throw an error given an incorrect timezone', function () {
    const events = new Set(['lazy-jar', 'artris']);
    const parsedCommand = {
      type: MOVE,
      event: 'artris',
      to: '6:00 am everyday',
      zone: '...'
    };
    assert.throws(
      () => move(parsedCommand, events),
      /incorrect timezone/
    );
  });

});