class Chain {

	constructor(commands) {
		this.commands = commands;
		this.current = this.commands[0];
	}


}

module.exports = Chain;