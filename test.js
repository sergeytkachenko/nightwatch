let config = require('./example.json');
let json = JSON.stringify(config);
let Builder = require('./builder/Builder');
let Spider = require('./spider');

let browser = Spider.init();
// browser.index = 0;
// function run() {
// 	browser
// 		.url('http://cc.porscheinformatik.com/nwapp/nws_ua/ICC3/AUDI!uk!!!A!!!')
// 		.waitForVisible('.modell_bild tr td', 5000)
// 		.execute(function(selector) {
// 			var elements = document.querySelectorAll(selector);
// 			elements.forEach(function(element, i) {
// 				element.setAttribute('loop-index', i);
// 			});
// 		}, '.modell_bild tr td')
// 		.click(`.modell_bild tr td[loop-index='${browser.index}']`)
// 		.pause(1000).then(() => {
// 			if (browser.index > 10) {
// 				end();
// 				return;
// 			}
// 			browser.index = browser.index + 1;
// 			console.log(browser.index);
// 			run();
// 		});
// }
//
// function end() {
// 	browser.end();
// }
// run();
let builder = new Builder();
let chain = builder.fromJson(json).buildChain();
chain.run();
//Spider.end();
