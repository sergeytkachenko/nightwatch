let assert = require('assert');
let chai = require('chai');
let sinon = require('sinon');

let should = chai.should();
let expect = chai.expect;

let config = require('../../../example.json');
let json = JSON.stringify(config);
let Chain = require('../../../builder/chain/Chain');
let ChainElement = require('../../../builder/chain/ChainElement');
let Builder = require('../../../builder/Builder');
let Loop = require('../../../builder/Loop');
