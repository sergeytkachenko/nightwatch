const events = require('../Events');
let Command = require('./Command');
let Spider = require('../../spider');

class PaginationClick extends Command {

	constructor(config) {
		super(config);
		this.lastHash = null;
	}

	/**
	 * @return {Promise}
	 */
	execute() {
		return this.beforeExecute()
			.then(() => this.browserClick());
	}

	browserClick() {
		if (this.lastHash) {
			return Spider.execute(function(selector) {
				var el = document.querySelector(selector);
				el.click();
			}, `[hash="${this.lastHash}"]`);
		}
		return events.emit('end-execute');
	}

	beforeExecute() {
		let selector = this.params[0];
		return Spider.waitForVisible(selector)
			.pause(1000)
			.execute(function(selector, lastHash) {
				var nextHash;
				String.prototype.hashCode = function() {
					var hash = 0, i, chr, len;
					if (this.length === 0) return hash;
					for (i = 0, len = this.length; i < len; i++) {
						chr   = this.charCodeAt(i);
						hash  = ((hash << 5) - hash) + chr;
						hash |= 0;
					}
					return hash;
				};
				var elements = document.querySelectorAll(selector);
				elements.forEach(function(element) {
					var hash = element.innerHTML.hashCode();
					element.setAttribute('hash', hash);
				});
				elements.forEach(function(element, i) {
					var hash = element.getAttribute('hash');
					if (hash === lastHash) {
						var nextElement = elements[i + 1];
						if (nextElement) {
							nextHash = nextElement.getAttribute('hash');
						} else {
							nextHash = null;
						}
						return false;
					}
				});
				if (nextHash === undefined) {
					nextHash = elements[0].getAttribute('hash');
				}
				return nextHash;
			}, selector, this.lastHash).then(result => {
				return this.lastHash = result.value;
			});
	}
}

module.exports = PaginationClick;