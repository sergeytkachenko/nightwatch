let Spider = require('../../spider');
const events = require('../Events');

class Command {

	constructor(config) {
		this.cmd = config.cmd;
		this.params = config.params;
		this.key = config.key;
		this.next = null;
	}

	/**
	 * Execute command.
	 * @return {Promise}
	 */
	execute() {
		let method = Spider[this.cmd];
		let params = this.params;
		return method.apply(Spider, params).then(this.nextExecute());
	}

	/**
	 * Execute next command.
	 * @private
	 * @return {Promise|undefined}
	 */
	nextExecute() {
		if (this.next) {
			return this.next.execute();
		}
		events.emit('last-execute');
	}

	/**
	 * Sets next command.
	 * @param {Command} next
	 */
	setNext(next) {
		this.next = next;
	}
}

module.exports = Command;