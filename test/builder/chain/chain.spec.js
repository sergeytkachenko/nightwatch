let assert = require('assert');
let chai = require('chai');
let sinon = require('sinon');

let should = chai.should();
let expect = chai.expect;

let config = require('../../../example.json');
let json = JSON.stringify(config);
let Chain = require('../../../builder/chain/Chain');
let Builder = require('../../../builder/Builder');
let Command = require('../../../builder/command/Command');
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
		it('should call clearLoopStack', () => {
			events.emit('clear-loop-stack');
			expect(chain.loopStack).to.be.null;
		});
		describe('when loopStack is null', () => {
			it('should set loopStack', () => {
				events.emit('set-loop-stack', 'command');
				expect(chain.loopStack).to.equal('command');
			});
		});
		describe('when loopStack is not null', () => {
			beforeEach(() => {
				chain.loopStack = 'cmd';
			});
			it('should set loopStack', () => {
				events.emit('set-loop-stack', 'command');
				expect(chain.loopStack).to.equal('cmd');
			});
		});
	});
	describe('hasOwnerLoopCommand', () => {
		describe('when command is owner', () => {
			beforeEach(() => {
				chain.loopStack = chain.command;
			});
			it('should return expected value', () => {
				let expected = chain.hasOwnerLoopCommand(chain.command);
				expect(expected).to.be.true;
			});
		});
		describe('when command is not owner', () => {
			beforeEach(() => {
				chain.loopStack = chain.command.next;
			});
			it('should return expected value', () => {
				let expected = chain.hasOwnerLoopCommand(chain.command);
				expect(expected).to.be.false;
			});
		});
	});
});