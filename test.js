var Spider = require('./spider');
Spider.url('http://cc.porscheinformatik.com/nwapp/nws_ua/ICC3/AUDI!uk!!!A!!!');
Spider.click('#mgn306').pause(1000).text('#modell_8XFBSG .modell_list_td2 label:first-child').then((text) => {
	console.log(text);
}).text('#modell_8XFBSG .modell_list_td7 label:first-child').then((text) => {
	console.log(text);
}).end();
