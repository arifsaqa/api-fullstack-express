const mongo = require('mongoose');
const { MONGO_URL } = require('../config');

mongo.connect(MONGO_URL);

const db = mongo.connection;

module.exports = db;