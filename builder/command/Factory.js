let Command = require('./Command');

class Factory {

	/**
	 * {
     *   "cmd": "url",
     *   "params": ["http://google.com.ua"]
     * }
	 * @param {Object} actionConfig
	 */
	static create(actionConfig) {
		let command = new Command(actionConfig);
		return command;
	}

	/**
	 * Creates commands array.
	 * @param {Object[]} actionsConfig
	 * @return {Command[]} Commands array.
	 */
	static creates(actionsConfig) {
		let commands = actionsConfig.map(actionConfig => Factory.create(actionConfig));
		return commands;
	}

}

module.exports = Factory;