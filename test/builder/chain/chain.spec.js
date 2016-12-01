let assert = require('assert');
let chai = require('chai');
let sinon = require('sinon');

let should = chai.should();
let expect = chai.expect;

let config = require('../../../example.json');
let json = JSON.stringify(config);
let Chain = require('../../../builder/chain/Chain');
let Builder = require('../../../builder/Builder');
const events = require('../../../builder/Events');
let Spider = require('../../../spider');

describe('Chain', () => {
	let builder = new Builder();
	let chain;
	beforeEach(() => {
		chain = builder.fromJson(json).buildChain();
		chain.command.execute = () => {};
		Spider.url = () => new Promise(resolve => resolve());
		Spider.end = () => new Promise(resolve => resolve());
	});
	describe('run', () => {
		let executeFn;
		beforeEach(() => {
			executeFn = sinon.spy(chain.command, 'execute');
		});
		it('should call expected methods', () => {
			chain.run();
			sinon.assert.calledOnce(executeFn);
		});
	});
	describe('init', () => {
		let runFn;
		let endFn;
		beforeEach(() => {
			runFn = sinon.spy(chain, 'run');
			endFn = sinon.spy(chain, 'end');
			chain.command.execute = () => {};
		});
		it('should call run', () => {
			events.emit('last-execute');
			sinon.assert.calledOnce(runFn);
		});
		it('should call end', () => {
			events.emit('end-execute');
			sinon.assert.calledOnce(endFn);
		});
	});
});