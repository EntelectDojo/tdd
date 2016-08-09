'use strict';
var removeOldLogs = require('../logging/remove-old-logs.job.js');

module.exports = function schedule() {
    console.log('Scheduling jobs ...');
    removeOldLogs.schedule();
    console.log('Done Scheduling jobs.');
};

