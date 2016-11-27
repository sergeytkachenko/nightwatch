let assert = require('assert');
let chai = require('chai');
let sinon = require('sinon');

let should = chai.should();
let expect = chai.expect;

let config = require('../../../example.json');
let json = JSON.stringify(config);
let Chain = require('../../../builder/chain/Chain');
let Builder = require('../../../builder/Builder');

describe('Chain', () => {
	let builder = new Builder();
	let chain;
	beforeEach(() => {
		chain = builder.fromJson(json).buildChain();
	});
	describe('hasNext', () => {
		describe('with has next chain element', () => {
			it('should return expected value', () => {
				expect(chain.hasNext()).to.be.true;
			});
		});
		describe('with not has next chain element', () => {
			chain = builder.fromJson(json).buildChain();
			it('should return expected value', () => {
				chain.chainElements = [1,2];
				chain.currStepIndex = 2;
				expect(chain.hasNext()).to.be.false;
			});
		});
		describe('with chainElements is empty', () => {
			chain = builder.fromJson(json).buildChain();
			it('should return expected value', () => {
				chain.chainElements = [];
				expect(chain.hasNext()).to.be.false;
			});
		});
	});
	describe('hasPrev', () => {
		describe('with not has prev chain element', () => {
			it('should return expected value', () => {
				expect(chain.hasPrev()).to.be.false;
			});
		});
		describe('with has prev chain element', () => {
			chain = builder.fromJson(json).buildChain();
			it('should return expected value', () => {
				chain.currStepIndex = 4;
				expect(chain.hasPrev()).to.be.true;
			});
		});
		describe('with chainElements is empty', () => {
			chain = builder.fromJson(json).buildChain();
			it('should return expected value', () => {
				chain.chainElements = [];
				chain.currStepIndex = 4;
				expect(chain.hasPrev()).to.be.false;
			});
		});
	});
	describe('prev', () => {
		describe('with not has prev chain element', () => {
			it('should return expected value', () => {
				expect(chain.prev()).to.be.false;
			});
		});
		describe('with has prev chain element', () => {
			let chainElement;
			beforeEach(() => {
				chainElement = chain.chainElements[3];
				sinon.stub(chainElement, 'needLoop', () => {});
			});
			it('should return expected value', () => {
				chain.currStepIndex = 4;
				chain.prev();
				sinon.assert.called(chainElement.needLoop);
			});
		});
	});
	describe('next', () => {
		let chainElement;
		beforeEach(() => {
			chainElement = chain.chainElements[0];
			sinon.stub(chainElement, 'run', () => {});
		});
		describe('with has next chain element', () => {
			it('should call expected method', () => {
				chain.next();
				sinon.assert.called(chainElement.run);
			});
		});
		describe('with not has next chain element', () => {
			it('should not call expected method', () => {
				chain.currStepIndex = 4;
				chain.next();
				sinon.assert.notCalled(chainElement.run);
			});
		});
	});
});