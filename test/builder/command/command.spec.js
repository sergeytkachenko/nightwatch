let mocha = require('mocha')
let coMocha = require('co-mocha')

coMocha(mocha);

let assert = require('assert');
let chai = require('chai');
let sinon = require('sinon');

let should = chai.should();
let expect = chai.expect;

let config = require('../../../example.json');
let json = JSON.stringify(config);
let Command = require('../../../builder/command/Command');
let Spider = require('../../../spider');
const events = require('../../../builder/Events');

describe('Command', () => {
	describe('execute', () => {
		let command;
		let nextExecute;
		beforeEach(() => {
			command = new Command(config.actions[0]);
			let nextCommand = new Command(config.actions[1]);
			nextCommand.execute = () => true;
			command.setNext(nextCommand);
			Spider.url = () => new Promise(resolve => resolve());
		});
		it('should call nextExecute', function * () {
			let result = yield command.execute();
			expect(result).to.be.true;
		});
	});
	describe('nextExecute', () => {
		let command;
		beforeEach(() => {
			command = new Command(config.actions[0]);
		});
		describe('when has next command', () => {
			beforeEach(() => {
				let nextCommand = new Command(config.actions[1]);
				command.setNext(nextCommand);
				nextCommand.execute = () => true;
			});
			it('should call nextExecute', () => {
				let result = command.nextExecute();
				expect(result).to.be.true;
			});
		});
		describe('when has not next command', () => {
			beforeEach(() => {
				sinon.stub(events, 'emit');
			});
			it('should call nextExecute', () => {
				command.nextExecute();
				sinon.assert.calledWith(events.emit, 'last-execute');
			});
		});
	});
});
