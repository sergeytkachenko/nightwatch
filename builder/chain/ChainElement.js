const events = require('../Events');

class ChainElement {

	constructor(config) {
		this.command = config.command;
		this.loop = config.loop;
	}

	setNext(next) {
		this.next = next;
	}

	/**
	 *
	 * @return {Promise}
	 */
	execute() {
		let loop = this.loop;
		if (loop) {
			return this.command.calcElements()
				.then(elementsLength => loop.setLoopLength(elementsLength))
				.then(() => {
					this.command.setLoopIndexSelector(this.loop.loopIndex);
				})
				.then(() => this.command.execute())
				.then(() => this.countIterationLoop())
				.then(() => this.nextExecute());
		}
		return this.command.execute()
			.then(() => this.countIterationLoop())
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

	/**
	 * @private
	 */
	countIterationLoop() {
		let loop = this.loop;
		let next = this.next;
		if (!loop) {
			return;
		}
		loop.increment();
		if (next) {
			next.resetCountIterationLoop();
		}
	}

	resetCountIterationLoop() {
		let loop = this.loop;
		let next = this.next;
		if (loop) {
			loop.reset();
		}
		if (next) {
			next.resetCountIterationLoop();
		}
	}

	hasIterations() {
		let loop = this.loop;
		let next = this.next;
		if (loop) {
			return loop.isCompleted() === false;
		}
		if (next) {
			return next.hasIterations();
		}
		return false;
	}
}

module.exports = ChainElement;