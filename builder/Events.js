const EventEmitter = require('events').EventEmitter;

class Events extends EventEmitter {}
const events = new Events();

module.exports = events;