let Command = require('../command/Command');
let LoopClick = require('../command/LoopClick');

class CommandFactory {

	/**
	 * @private
	 * {
     *   "cmd": "url",
     *   "params": ["http://google.com.ua"]
     * }
	 * @param {Object} actionConfig
	 * @return {Command}
	 */
	static create(actionConfig) {
		return actionConfig.class ? new LoopClick(actionConfig) : new Command(actionConfig);
	}

	/**
	 * Creates Commands array.
	 * @param {Object[]} actionsConfig
	 * @return {Command[]} Command array.
	 */
	static creates(actionsConfig) {
		let command = actionsConfig
			.map(actionConfig => CommandFactory.create(actionConfig))
			.map(this.link);
		return command;
	}

	/**
	 * Links next element for each element.
	 * @private
	 * @param {Command} command
	 * @param {Number} index
	 * @param {Command[]} commands
	 * @return {Command}
	 */
	static link(command, index, commands) {
		if (!index) {
			return command;
		}
		let prevCommand = commands[index - 1];
		prevCommand.setNext(command);
		return command;
	}

}

module.exports = CommandFactory;