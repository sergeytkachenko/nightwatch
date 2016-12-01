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
		var command;
		beforeEach(() => {
			command = new Command(config.actions[0]);
			sinon.stub(command, 'nextExecute', () => {});
			Spider.url = () => new Promise(resolve => resolve());
		});
		it('should call nextExecute', () => {
			command.execute();
			sinon.assert.calledOnce(command.nextExecute);
		});
	});
	describe('nextExecute', () => {
		var command;
		var nextCommand;
		beforeEach(() => {
			command = new Command(config.actions[0]);
		});
		describe('when has next command', () => {
			beforeEach(() => {
				nextCommand = new Command(config.actions[1]);
				command.setNext(nextCommand);
				sinon.stub(nextCommand, 'execute', () => {});
			});
			it('should call nextExecute', () => {
				command.nextExecute();
				sinon.assert.calledOnce(nextCommand.execute);
			});
		});
		describe('when has not next command', () => {
			beforeEach(() => {
				sinon.stub(events, 'emit', () => {});
			});
			it('should call nextExecute', () => {
				command.nextExecute();
				sinon.assert.calledWith(events.emit, 'last-execute');
			});
		});
	});
});
