/*globals describe, it, context, assert, chai, should, expect */ /*jshint expr: true*/ // eslint-disable-line
'use strict';
require('../init.js');
/* ----========[ end of test file setup ]========---- */
var projectSchema = require('../../src/projects/project-schema.json');
var _ = require('lodash');
var ajv = new require('ajv')();

describe('Project', function () {
    describe('Validation', function () {
        var validProject = {name: "validProject"};
        it('Example object should pass validation', function () {
            var data = _.cloneDeep(validProject);
            var valid = ajv.validate(projectSchema, data);
            var errorMessage = ajv.errorsText();
            expect(valid, 'Example object should be valid').to.be.ok();
            expect(errorMessage, "Example object should result in no error messages").to.equal("No errors");
        });
        describe('Name', function () {
            var property = 'name';
            it('Is required', function () {
                checkRequiredProperty(projectSchema, validProject, property);
            });
        });
    });
});

function checkRequiredProperty(schema, validData, propertyName) {
    var data = _.cloneDeep(validData);
    delete data[propertyName];
    var valid = ajv.validate(schema, data);
    var errorMessage = ajv.errorsText();
    expect(valid, "Expected schema validation to fail because the required property '" + propertyName + "' was missing").to.not.be.ok();
    var expectedMessage = "data should have required property ':property'".replace(':property', propertyName);
    expect(errorMessage).to.equal(expectedMessage);
}