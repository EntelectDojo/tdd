'use strict';
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var config = require('config');
var serverOptions = {
    "server": {
        "socketOptions": {
            "keepAlive": 1
        },
        "auto_reconnect": true,
        "autoReconnect": true,
        "sslValidate": false
    },
    "replSet": {
        "socketOptions": {
            "keepAlive": 1
        },
        "auto_reconnect": true,
        "autoReconnect": true,
        "sslValidate": false
    }
};

module.exports = {
    connect: function (callback) {
        MongoClient.connect(config.get('database.url'), serverOptions, function (err, db) {
            if (err) {
                return callback(err);
            }

            module.exports.db = db;
            callback(null, db);
        });
    },
    db: {},
    ObjectId: mongo.ObjectId,
    collections: {
        projects: function () {
            return module.exports.db.collection('projects');
        }
    },
    close: function () {
        module.exports.db.close();
    },
    isValidObjectId: function (id) {
        if (!id) {
            return false;
        }
        if (id.toString().length !== 24) {
            return false;
        }
        return module.exports.ObjectId.isValid(id.toString());
    }
};