const events = require('../Events');

class ChainElement {

	constructor(config) {
		this.command = config.command;
	}

	setNext(next) {
		this.next = next;
	}

	execute() {
		return this.command.execute()
			.then(() => this.nextExecute());
	}

	/**
	 * @private
	 * @return {Promise|undefined}
	 */
	nextExecute() {
		if (this.next) {
			return this.next.execute();
		}
		events.emit('last-execute');
	}
}

module.exports = ChainElement;