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
	 */
	static create(actionConfig) {
		let command = new Command(actionConfig);
		let loop = new Loop();
		return new ChainElement({command, loop});
	}

	/**
	 * Creates ChainElement array.
	 * @param {Object[]} actionsConfig
	 * @return {Command[]} ChainElement array.
	 */
	static creates(actionsConfig) {
		return actionsConfig.map(actionConfig => ChainElementFactory.create(actionConfig));
	}

}

module.exports = ChainElementFactory;