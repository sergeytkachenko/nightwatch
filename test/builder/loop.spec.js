let assert = require('assert');
let chai = require('chai');
let sinon = require('sinon');

let should = chai.should();
let expect = chai.expect;

let config = require('../../example.json');
let json = JSON.stringify(config);
let Loop = require('../../builder/Loop');

describe('Loop', () => {
	describe('isCompleted', () => {
		describe('with loopLength > loopIndex', () => {
			it('should return expected value', function() {
				let loop = new Loop();
				loop.loopLength = 1;
				loop.loopIndex = 0;
				expect(loop.isCompleted()).to.be.false;
			});
		});
		describe('with loopLength < loopIndex', () => {
			it('should return expected value', function() {
				let loop = new Loop();
				loop.loopLength = 0;
				loop.loopIndex = 1;
				expect(loop.isCompleted()).to.be.true;
			});
		});
		describe('with loopLength == loopIndex', () => {
			it('should return expected value', function() {
				let loop = new Loop();
				loop.loopLength = 1;
				loop.loopIndex = 1;
				expect(loop.isCompleted()).to.be.true;
			});
		});
	});
	describe('increment', () => {
		it('should increment loopIndex', function() {
			let loop = new Loop();
			loop.increment();
			expect(loop.loopIndex).to.equal(1);
		});
	});
});