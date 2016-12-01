let Chain = require('./chain/Chain');
let CommandFactory = require('./chain/CommandFactory');

class Builder {

	constructor() {
		this.key = null;
		this.actions = null;
	}

	/**
	 * Parse actions and saved it.
	 * @param {String} json Parsing json.
	 * @return {Builder}
	 */
	fromJson(json) {
		let config = this.parseJson(json);
		this.key = config.key;
		this.actions = config.actions;
		return this;
	}

	/**
	 * Creates chain.
	 * @return {Chain} Chain with commands.
	 */
	buildChain() {
		if (!this.actions) {
			throw 'actions should be initialize';
		}
		let commands = CommandFactory.creates(this.actions);
		let chain = new Chain(commands[0]);
		return chain;
	}

	/**
	 * @private
	 * @param {String} json JSON to need parse.
	 */
	parseJson(json) {
		try {
			return JSON.parse(json);
		} catch (e) {
			throw('json not valid');
		}
	}
}

module.exports = Builder;