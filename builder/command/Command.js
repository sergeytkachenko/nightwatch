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

	calcElements() {
		let selector = this.params[0];
		selector = selector.replace(/\[loop-index='[0-9]+'\]/, '');
		return Spider.waitForVisible(selector)
			.execute(function(selector) {
				var elements = document.querySelectorAll(selector);
				elements.forEach(function(element, i) {
					element.setAttribute('loop-index', i);
				});
			}, selector)
			.elements(selector).then(elements => {
				return elements.value.length;
			});
	}

	setLoopIndexSelector(loopIndex) {
		let selector = this.params[0];
		selector = selector.replace(/\[loop-index='[0-9]+'\]/, '');
		this.params[0] = `${selector}[loop-index='${loopIndex}']`
	}
}

module.exports = Command;