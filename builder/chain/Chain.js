const events = require('../Events');
let Spider = require('../../spider');

class Chain {

	/**
	 *
	 * @param {Command} command
	 */
	constructor(command) {
		this.command = command;
		this.stack = null;
		this.init();
	}

	init() {
		events.on('last-execute', () => this.run());
		events.on('end-execute', () => this.end());
	}

	run() {
		this.command.execute();
	}

	end() {
		Spider.end();
	}
}

module.exports = Chain;