require('dotenv').config();
const path = require('path');

const { MODE, SERVICE_NAME, PORT, MONGO_URL } = process.env;
const ROOT_PATH = path.resolve(__dirname, '..');
module.exports = {
  MODE,
  SERVICE_NAME,
  PORT,
  MONGO_URL,
  ROOT_PATH
};