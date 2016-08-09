'use strict';
var packageJson = require('./package.json');
var config = require('config');
var createApp = require('./src/app.js');
var port = config.get('port');
var scheduler = require('./src/jobs/scheduler.js');
createApp(function (err, app) {
    if (err) {
        console.error(err);
        throw err;
    }
    app.listen(port, function () {
        scheduler();
        console.info(packageJson.name + ' is listening on port ' + config.get('port'));
    });
});
