'use strict';
require('./logging/logger.js');
var error = require('./error/index.js');
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var morganOptions = require('./logging/morgan-options.js');
var routes = require('./routes');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
morganOptions.initialise();
app.use(morgan(morganOptions.format, morganOptions.morganOptions));
app.use(routes);
app.use(error.notFoundMiddleware);
app.use(error.errorHandlerMiddleware);

module.exports = app;