'use strict';
var packageJson = require('../../package.json');
module.exports = {
    // eslint-disable-next-line no-unused-vars
    errorHandlerMiddleware: function (err, req, res, next) {
        if (req.headers['user-agent'] === 'AlwaysOn') {
            return;
        }
        if (err.status && err.status >= 400 && err.status < 500) {
            return res.status(err.status).json({message: err.message});
        }
        console.error('Error middleware invoked : ', err, err.stack);
        return res.status(500).json({
            message: 'Sorry an error has occurred.'
        });
    },
    notFoundMiddleware: function (req, res) {
        res.status(404).json({message: 'Invalid route : ' + req.originalUrl});
    }
};

function exitProcess() {
    setTimeout(function () {
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }, 1000);
}

process.on('uncaughtException', function (err) {
    console.error('Unhandled Error on process : ', err, err.stack);
    exitProcess();
});

process.on('exit', function () {
    console.log(packageJson.name + ' is exiting');
});

process.on("SIGTERM", function () {
    console.log("SIGTERM received stopping processing.");
    exitProcess();
});

process.on("SIGINT", function () {
    console.log("SIGINT received stopping processing.");
    exitProcess();
});