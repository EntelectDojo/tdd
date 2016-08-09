'use strict';
var express = require('express');
var router = express.Router();
var packageJson = require('../../package.json');
var testErrors = require('../test-errors');
var config = require('config');
router.get('/', function (req, res) {
    res.status(200).json({
        appName: packageJson.name,
        version: packageJson.version,
        deploymentDate: packageJson.deploymentDate,
        environment: config.util.getEnv('NODE_ENV'),
        nodeVersion: process.version
    });
});
router.use('/error', testErrors);

module.exports = router;