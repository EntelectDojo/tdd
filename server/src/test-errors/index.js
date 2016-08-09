'use strict';
var express = require('express');
var router = express.Router();
router.get('/unhandled', function (req, res, next) {
    return next(new Error('Test error'));
});
router.get('/process', function () {
    throw new Error("Testing the uncaught process error");
});
module.exports = router;