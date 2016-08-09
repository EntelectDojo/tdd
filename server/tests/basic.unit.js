/*globals describe, it, assert, chai, should, expect */ /*jshint expr: true*/ // eslint-disable-line
'use strict';
require('./init.js');
/* ----========[ end of test file setup ]========---- */

describe('#BasicTests', function () {
    it('1. 1 = 1', function () {
        var one = 1;
        one.should.equal(1);
    });
});