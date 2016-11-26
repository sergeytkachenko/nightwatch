let redis = require("redis");
let client = redis.createClient();

class Store {

	static onError() {

	}

	static set(key, value) {
		client.set(key, value);
	}

	static quit() {
		client.quit();
	}
}

client.on("error", Store.onError);

module.exports = Store;