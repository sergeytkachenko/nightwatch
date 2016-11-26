
class Command {

	constructor(config) {
		this.cmd = config.cmd;
		this.params = config.params;
		this.loop = config.loop || false;
		this.key = config.key;
	}

	execute() {

	}
}

module.exports = Command;