let Spider = require('../../spider');

class Command {

	constructor(config) {
		this.cmd = config.cmd;
		this.params = config.params;
		this.key = config.key;
	}

	execute() {
		Spider[this.cmd].apply(Spider, this.params);
	}
}

module.exports = Command;