const events = require('../Events');
let Spider = require('../../spider');

class Chain {

	/**
	 *
	 * @param {Command} command
	 */
	constructor(command) {
		this.command = command;
		this.loopStack = null;
		this.init();
	}

	init() {
		events.on('last-execute', () => this.run());
		events.on('end-execute', () => this.end());
		events.on('set-loop-stack', command => this.setLoopStack(command));
		events.on('clear-loop-stack', () => this.clearLoopStack());
	}

	run() {
		this.command.execute();
	}

	end() {
		Spider.end();
	}

	setLoopStack(command) {
		if (this.loopStack) {
			return false;
		}
		this.loopStack = command;
		return true;
	}

	clearLoopStack() {
		this.loopStack = null;
	}

	hasOwnerLoopCommand(command) {
		return command === this.loopStack;
	}
}

module.exports = Chain;