let webdriverio = require('webdriverio');
let options = {
	desiredCapabilities: {
		browserName: 'chrome'
	}
};
let b = webdriverio
	.remote(options)
	.init();

let DEFAULT_TIMEOUT = 5000;

class Spider {

	static getBrowser() {
		return b;
	}

	static url(url) {
		return b = b.url(url);
	}

	static getSource(url) {
		return b = b.url(url).getSource();
	}

	static click(selector) {
		return b = b.waitForVisible(selector, DEFAULT_TIMEOUT).click(selector);
	}

	static text(selector) {
		return b = b.waitForVisible(selector, DEFAULT_TIMEOUT).getText(selector);
	}

	static moveToObject(selector) {
		return b = b.waitForVisible(selector, DEFAULT_TIMEOUT).moveToObject(selector);
	}
}

module.exports = Spider;