let Command = require('../command/Command');
let Loop = require('../Loop');
let ChainElement = require('./ChainElement');

class ChainElementFactory {

	/**
	 * {
     *   "cmd": "url",
     *   "params": ["http://google.com.ua"]
     * }
	 * @param {Object} actionConfig
	 * @return {ChainElement}
	 */
	static create(actionConfig) {
		let command = new Command(actionConfig);
		let loop = actionConfig.loop ? new Loop() : null;
		return new ChainElement({command, loop});
	}

	/**
	 * Creates ChainElement array.
	 * @param {Object[]} actionsConfig
	 * @return {ChainElement[]} ChainElement array.
	 */
	static creates(actionsConfig) {
		let chainElements = actionsConfig.map(actionConfig => ChainElementFactory.create(actionConfig));
		return this.links(chainElements);
	}

	static links(chainElements) {
		chainElements.forEach((chainElement, index) => {
			let nextIndex = index + 1;
			if (chainElements.length - 1 < nextIndex) {
				return;
			}
			let next = chainElements[nextIndex];
			chainElement.setNext(next);
		});
		return chainElements;
	}

}

module.exports = ChainElementFactory;