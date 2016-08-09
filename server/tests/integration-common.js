/*globals describe, it, assert, chai, should, expect, before, after */ /*jshint expr: true*/ // eslint-disable-line
'use strict';
require('./init.js');
var createApp = require('../src/app.js');
var mongo = require('../src/mongo');

before(function (done) {
    createApp(appCreated);
    function appCreated(err, app) {
        if (err) {
            console.error(err);
            return done(err);
        }
        module.exports.app = app;
        done();
    }
});

after(function (done) {
    mongo.close();
    done();
});

module.exports = {
    defaultTimeout: 5000,
    app: {},
    success: function (res) {
        expect(res.error, 'The response body contained an error : ' + JSON.stringify(res.error)).to.not.be.ok();
    },
    error: function (res) {
        expect(res.error, 'Expected an error in the response but there was not one').to.be.ok();
    },
    expectNoServerError: function expectNoServerError(err, res) {
        if (err) {
            console.error(err);
            expect(err, 'There was an exception calling the api : ' + JSON.stringify(res.error)).to.not.be.ok();
        }
    }
};

