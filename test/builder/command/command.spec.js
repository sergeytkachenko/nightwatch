let assert = require('assert');
let chai = require('chai');
let sinon = require('sinon');

let should = chai.should();
let expect = chai.expect;

let config = require('../../../example.json');
let json = JSON.stringify(config);
let Command = require('../../../builder/command/Command');
let Spider = require('../../../spider');

describe('Command', () => {
	sinon.stub(Spider, 'url', () => '');
	describe('execute', () => {
		var command = new Command(config.actions[0]);
		it('should call expected methods', () => {
			command.execute();
			sinon.assert.calledWith(Spider.url, 'http://cc.porscheinformatik.com/nwapp/nws_ua/ICC3/AUDI!uk!!!A!!!');
		});
	});
});