let assert = require('assert');
let chai = require('chai');
let sinon = require('sinon');

let should = chai.should();
let expect = chai.expect;

let Builder = require('../../builder/Builder');
let config = require('../../example.json');
let json = JSON.stringify(config);
let Chain = require('../../builder/chain/Chain');

describe('Builder', () => {
	describe('parseJson', () => {
		describe('with not valid json', () => {
			it('should throw error', function() {
				let builder = new Builder();
				expect(() => builder.parseJson("")).to.throw('json not valid');
			});
		});
		describe('with valid json', () => {
			it('should return object', function() {
				let builder = new Builder();
				expect(builder.parseJson(json)).to.be.an('object');
			});
		});
	});
	describe('fromJson', () => {
		it('should throw error', function() {
			let builder = new Builder();
			let parseJson = sinon.spy(builder, 'parseJson');
			builder.fromJson(json);
			sinon.assert.calledOnce(parseJson);
		});
	});
	describe('buildChain', () => {
		describe('with not empty actions', () => {
			let builder = new Builder();
			builder.fromJson(json);
			it('should return expected value', function() {
				let expected = builder.buildChain();
				expect(expected).to.be.an.instanceof(Chain);
				let elements = expected.elements;
				expect(Object.keys(elements)).to.have.lengthOf(5);
			});
		});
		describe('with empty actions', () => {
			let builder = new Builder();
			it('should return expected value', function() {
				expect(() => builder.buildChain()).to.throw('actions should be initialize');
			});
		});
	});
});