var Spider = require('./spider');
var store = require('./store');

let obj = {};

Spider.url('http://cc.porscheinformatik.com/nwapp/nws_ua/ICC3/AUDI!uk!!!A!!!');
Spider.click('#mgn306');
Spider.pause(1000);
Spider.text('#modell_8XFBSG .modell_list_td2 label:first-child').then(text => {
	obj.keya = text;
});
Spider.text('#modell_8XFBSG .modell_list_td7 label:first-child').then(text => {
	obj.keyb = text;
	store.set('md5', JSON.stringify(obj));
	store.quit();
}).end();
