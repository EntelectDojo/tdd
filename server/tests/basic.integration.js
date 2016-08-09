/*globals describe, it, assert, chai, should, expect */ /*jshint expr: true*/ // eslint-disable-line
'use strict';
var common = require('./integration-common');
var request = require('supertest');
/* ----========[ end of test file setup ]========---- */

describe('#BasicTests', function () {
    this.timeout(common.defaultTimeout);
    it('1. Get root', function (done) {
        request(common.app)
            .get('/')
            .expect(200)
            .expect(common.success)
            .end(done);
    });
});