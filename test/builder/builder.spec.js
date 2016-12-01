let assert = require('assert');
let chai = require('chai');
let sinon = require('sinon');

let should = chai.should();
let expect = chai.expect;

let Builder = require('../../builder/Builder');
let config = require('../../example.json');
let json = JSON.stringify(config);
let Chain = require('../../builder/chain/Chain');
const events = require('../../builder/Events');

describe('Builder', () => {
	let builder;
	afterEach(() => {
		events.removeAllListeners('last-execute');
		events.removeAllListeners('end-execute');
	});
	describe('parseJson', () => {
		describe('with not valid json', () => {
			it('should throw error', function() {
				let builderThrow = new Builder();
				expect(() => builderThrow.parseJson("")).to.throw('json not valid');
			});
		});
		describe('with valid json', () => {
			it('should return object', function() {
				builder = new Builder();
				expect(builder.parseJson(json)).to.be.an('object');
			});
		});
	});
	describe('fromJson', () => {
		it('should throw error', function() {
			builder = new Builder();
			let parseJson = sinon.spy(builder, 'parseJson');
			builder.fromJson(json);
			sinon.assert.calledOnce(parseJson);
		});
	});
	describe('buildChain', () => {
		describe('with not empty actions', () => {
			builder = new Builder();
			builder.fromJson(json);
			it('should return expected value', function() {
				let expected = builder.buildChain();
				expect(expected).to.be.an.instanceof(Chain);
				let command = expected.command;
				let nextCommand = command.next;
				expect(command.cmd).to.equal('url');
				expect(nextCommand.cmd).to.equal('click');
			});
		});
		describe('with empty actions', () => {
			let builderThrow = new Builder();
			it('should return expected value', function() {
				expect(() => builderThrow.buildChain()).to.throw('actions should be initialize');
			});
		});
	});
});