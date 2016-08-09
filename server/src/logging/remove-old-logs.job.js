'use strict';
var fs = require('fs');
var path = require('path');
var CronJob = require('cron').CronJob;
var config = require('config');
var appRootPath = require('app-root-path');
var fileLogPath = appRootPath.resolve(config.get('logging.file.folder'));
var moment = require('moment');
var async = require('async');
var cronTimers = require('../jobs/cron-timers.js');

module.exports = {
    schedule: schedule
};

function schedule() {
    var startTheJobAutomatically = true; //if false, remember to call job.start(), assuming job is the variable you set the cron job to.
    // eslint-disable-next-line no-new
    new CronJob(cronTimers.everyHour, onTick, null, startTheJobAutomatically, config.get('timeZone'));
    console.log('Scheduled the remove old logs job');
}

function onTick(jobDone) {
    var fileRemovalThreshold = moment().subtract(config.get('logging.file.retention.amount'), config.get('logging.file.retention.units'));

    fs.readdir(fileLogPath, function (err, files) {
        if (err) {
            console.error("Error reading log files for removal", err);
            return jobDone();
        }
        async.eachSeries(files, checkIfFileNeedsToBeRemoved, finishedRemovingOldFiles);
    });

    function checkIfFileNeedsToBeRemoved(file, done) {
        if (file === '.gitignore') {
            return done();
        }
        var fileDateTimeString = file.split(".")[1]; // get the date from the file name
        var fileDateTime = moment(fileDateTimeString, "YYYY-MM-DDTHH");
        if (!fileDateTime) {
            console.warn('File (' + file + ') did not have a valid date, ignoring');
            return done();
        }
        if (fileDateTime > fileRemovalThreshold) {
            return done();
        }
        fs.unlink(path.join(fileLogPath, file), function (err) {
            if (err) {
                console.error('Error deleting old log file: ', err);
            }
            console.info("Deleted log file: " + file);
            done();
        });
    }

    function finishedRemovingOldFiles(err) {
        if (err) {
            console.error(err);
            if (jobDone) {
                return jobDone(err);
            }
        }
        if (jobDone) {
            return jobDone();
        }
    }
}
