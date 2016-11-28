const events = require('../Events');
let Spider = require('../../spider');

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
		events.on('end-execute', () => this.end());
	}

	run() {
		this.firstElement.execute();
	}

	end() {
		Spider.end();
	}
}

module.exports = Chain;