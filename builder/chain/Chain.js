const events = require('../Events');
let Spider = require('../Builder');

class Chain {

	/**
	 *
	 * @param {ChainElement} firstElement
	 */
	constructor(firstElement) {
		this.firstElement = firstElement;
		this.init();
	}

	init() {
		events.on('last-execute', () => this.run());
	}

	run() {
		if (this.firstElement.hasIterations()) {
			this.firstElement.execute();
		}
	}

	end() {
		Spider.end();
	}
}

module.exports = Chain;