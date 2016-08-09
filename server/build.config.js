'use strict';
module.exports = {
    inputFiles: {
        index: ["./index.js"],
        source:["./src/**/*.js"],
        config:["./config/*.json"],
        package:["./package.json"],
        unitTests:['./tests/**/*.unit.js'],
        integrationTests:['./tests/**/*.integration.js'],
        webConfig:['./web.config']
    },
    outputPaths:{
        root:"./build",
        config:"./build/config",
        app:"./build/src"
    }
};