const add = require('./add/add');
const remove = require('./remove/remove');
const halt = require('./halt/halt');
const move = require('./move/move');
const resume = require('./resume/resume');
const schedule = require('./schedule/schedule');
const skip = require('./skip/skip');
const terminate = require('./terminate/terminate');
const start = require('./start/start');
const stop = require('./stop/stop');

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
    STOP
} = require('../commands');

module.exports = require('./actions.factory')(
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
    TERMINATE,
    START,
    STOP
);