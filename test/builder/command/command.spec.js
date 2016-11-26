let assert = require('assert');
let chai = require('chai');
let sinon = require('sinon');

let should = chai.should();
let expect = chai.expect;

let config = require('../../example.json');
let json = JSON.stringify(config);
let Chain = require('../../builder/chain/Chain');
let Builder = require('../../builder/Builder');
let Command = require('../../builder/command/Command');

describe('Command', () => {
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
});