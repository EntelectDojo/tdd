/*globals describe, it, assert, chai, should, expect */ /*jshint expr: true*/ // eslint-disable-line
'use strict';
require('./init.js');
var request = require('supertest');
var app = require('../src/app.js');
/* ----========[ end of test file setup ]========---- */

describe('#BasicTests', function () {
    it('1. Get root', function (testDone) {
        request(app)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                console.log(err);
                console.log(res.body);
                testDone();
            });
    });
});