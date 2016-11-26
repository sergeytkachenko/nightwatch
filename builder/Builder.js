let Chain = require('./chain/Chain');
let Factory = require('./command/Factory');

class Builder {

	constructor() {
		this.key = null;
		this.actions = null;
	}

	/**
	 * Parse actions and saved it.
	 * @param {String} json Parsing json.
	 */
	fromJson(json) {
		let config = this.parseJson(json);
		this.key = config.key;
		this.actions = config.actions;
	}

	/**
	 * Creates chain.
	 * @return {Chain} Chain with commands.
	 */
	buildChain() {
		if (!this.actions) {
			throw 'actions should be initialize';
		}
		let commands = Factory.creates(this.actions);
		let chain = new Chain(commands);
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