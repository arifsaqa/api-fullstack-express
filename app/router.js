const Router = require('express').Router();

const { index } = require('./controller');

Router.get('/', index);

module.exports = Router