require('dotenv').config();

const { MODE, SERVICE_NAME, PORT, MONGO_URL } = process.env;

module.exports = { MODE, SERVICE_NAME, PORT, MONGO_URL };