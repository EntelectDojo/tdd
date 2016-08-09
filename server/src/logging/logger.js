'use strict';
var util = require('util');
var winston = require('winston');
var config = require('config');
var fs = require('fs');
var appRootPath = require('app-root-path');
var fileLogPath = config.get('logging.file.folder');
fileLogPath = appRootPath.resolve(fileLogPath);
require('winston-loggly');
var logger = new winston.Logger();
var environment = config.util.getEnv('NODE_ENV');
var packageJson = require('../../package.json');

switch (environment.toLowerCase()) {
    case 'production':
    case 'qa':
        addFileLogging('silly');
        addConsoleLogging('silly');
        addLogglyLogging('silly');
        break;
    case 'test':
        addFileLogging('silly');
        addConsoleLogging('silly');
        break;
    default:
        addFileLogging('silly');
        addConsoleLogging('silly');
        break;
}

function addConsoleLogging(level) {
    logger.add(winston.transports.Console, {
        colorize: true,
        timestamp: true,
        level: level
    });
}

function addFileLogging(level) {
    logger.add(winston.transports.DailyRotateFile, {
        name: 'file',
        datePattern: '.yyyy-MM-ddTHH',
        filename: fileLogPath + '/' + environment + '-' + level,
        level: level,
        colorize: true,
        handleExceptions: true,
        exitOnError: false
    });
}

function addLogglyLogging(level) {
    var logSettings = config.get('logging.loggly');
    if (!logSettings.token) {
        console.warn("Loggly settings not provided, skipping");
        return;
    }
    logger.add(winston.transports.Loggly, {
        level: level,
        json: true,
        inputToken: logSettings.token,
        subdomain: logSettings.subdomain,
        auth: {
            username: logSettings.username,
            password: logSettings.password
        },
        tags: [packageJson.name]
    });
}

function formatArgs(args) {
    var argumentArray = Array.prototype.slice.call(args);
    var argumentsToPrint = argumentArray.map(function (arg) {
        if (arg instanceof Error) {
            return {
                message: arg.message,
                stack: arg.stack
            };
        }
        return arg;
    });
    return [util.format.apply(util.format, argumentsToPrint)];
}

(function ensureLogFolderExists() {
    fs.mkdir(fileLogPath, function (error) {
        if (error && error.code !== 'EEXIST') {
            throw error;
        }
    });
}());

console.log = function () {
    logger.info.apply(logger, formatArgs(arguments));
};
console.info = function () {
    logger.info.apply(logger, formatArgs(arguments));
};
console.warn = function () {
    logger.warn.apply(logger, formatArgs(arguments));
};
console.error = function () {
    logger.error.apply(logger, formatArgs(arguments));
};
console.debug = function () {
    logger.debug.apply(logger, formatArgs(arguments));
};
