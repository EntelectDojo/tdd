/*globals describe, it, context, assert, chai, should, expect */ /*jshint expr: true*/ // eslint-disable-line
'use strict';
require('../init.js');
/* ----========[ end of test file setup ]========---- */
var events = require('events');
var validProject = require('./valid-project.json');
var httpMocks = require('node-mocks-http');
var projectsController = require('../../src/projects');
describe('Project', function () {
    describe('Creation', function () {
        it('Should succeed if given a valid project', function (done) {
            var options = {
                method: 'GET',
                url: '/'
            };
            callController(projectsController, options, function (err, result) {
                done();
            });
        });
    });
});

function callController(controller, requestOption, callback) {
    var response = buildResponse();
    var request = httpMocks.createRequest(requestOption);
    response.on('end', function () {
        var result = {
            data: response._getData(),
            statusCode: response._getStatusCode(),
            headers: response._getHeaders()
        };
        callback(null, result);
    });
    controller.handle(request, response);
}

function buildResponse() {
    return httpMocks.createResponse({eventEmitter: events.EventEmitter});
}