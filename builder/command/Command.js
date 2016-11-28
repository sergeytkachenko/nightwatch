let Spider = require('../../spider');

class Command {

	constructor(config) {
		this.cmd = config.cmd;
		this.params = config.params;
		this.key = config.key;
	}

	/**
	 * @return {Promise}
	 */
	execute() {
		let method = Spider[this.cmd];
		let params = this.params;
		return method.apply(Spider, params);
	}
}

module.exports = Command;