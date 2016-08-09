'use strict';
console.log('Scheduling jobs ...');
require('../logging/remove-old-logs.job.js').schedule();
console.log('Done Scheduling jobs.');
