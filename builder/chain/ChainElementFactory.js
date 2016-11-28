let ChainElement = require('./ChainElement');
let Command = require('../command/Command');
let PaginationClick = require('../command/PaginationClick');

class ChainElementFactory {

	/**
	 * @private
	 * {
     *   "cmd": "url",
     *   "params": ["http://google.com.ua"]
     * }
	 * @param {Object} actionConfig
	 * @return {ChainElement}
	 */
	static create(actionConfig) {
		// TODO abstract factory
		let command = actionConfig.class ? new PaginationClick(actionConfig) : new Command(actionConfig);
		return new ChainElement({command});
	}

	/**
	 * Creates ChainElement array.
	 * @param {Object[]} actionsConfig
	 * @return {ChainElement[]} ChainElement array.
	 */
	static creates(actionsConfig) {
		let chainElements = actionsConfig
			.map(actionConfig => ChainElementFactory.create(actionConfig))
			.map(this.link);
		return chainElements;
	}

	/**
	 * Links next element for each element.
	 * @private
	 * @param {ChainElement} element
	 * @param {Number} index
	 * @param {ChainElement[]} elements
	 * @return {ChainElement}
	 */
	static link(element, index, elements) {
		if (!index) {
			return element;
		}
		let prevElement = elements[index - 1];
		prevElement.setNext(element);
		return element;
	}

}

module.exports = ChainElementFactory;