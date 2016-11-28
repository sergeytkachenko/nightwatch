let webdriverio = require('webdriverio');
let options = {
	desiredCapabilities: {
		browserName: 'chrome'
	}
};
let b;

let DEFAULT_TIMEOUT = 5000;

class Spider {

	static init() {
		return b = webdriverio.remote(options).init();
	}

	static getBrowser() {
		return b;
	}

	static url(url) {
		return b = b.url(url);
	}

	static getSource(url) {
		return b = b.url(url).getSource();
	}

	static waitForVisible(selector) {
		return b = b.waitForVisible(selector, DEFAULT_TIMEOUT);
	}

	static click(selector) {
		return b = b.waitForVisible(selector, DEFAULT_TIMEOUT).click(selector);
	}

	static text(selector) {
		return b = b.waitForVisible(selector, DEFAULT_TIMEOUT).getText(selector);
	}

	static pause(ms) {
		return b = b.pause(ms);
	}

	static moveToObject(selector) {
		return b = b.waitForVisible(selector, DEFAULT_TIMEOUT).moveToObject(selector);
	}

	static selectorExecute(selector) {
		return b = b.selectorExecute(selector);
	}

	static executeAsync(fun, a) {
		return b = b.executeAsync(fun, a);
	}

	static execute(fun, a) {
		return b = b.execute(fun, a);
	}

	static waitUntil(condition, timeout, timeoutMsg, interval) {
		return b = b.waitUntil(condition, timeout, timeoutMsg, interval);
	}

	static end() {
		return b = b.end();
	}
}

module.exports = Spider;