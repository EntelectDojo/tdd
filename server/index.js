'use strict';
var packageJson = require('./package.json');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('config');
var app = require('./src/app.js');

var port = config.get('port');
app.listen(port, function () {
    console.info(packageJson.name + ' is listening on port ' + config.get('port'));
    require('./src/jobs/scheduler.js');
});