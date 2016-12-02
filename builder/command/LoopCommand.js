const Command = require('./Command');
const events = require('../Events');

class LoopCommand extends Command {

	beforeExecute() {
		events.emit('set-loop-stack', this);
	}
}

module.exports = Command;