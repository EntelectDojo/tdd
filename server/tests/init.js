'use strict';
process.env.NODE_ENV = 'test';
var chai = require('chai');

require('../src/logging/logger.js');


global.chai = chai;
global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should();

if (!console.debug) {
    console.debug = console.log;
}