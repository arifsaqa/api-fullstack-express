const Router = require('express').Router();

const { index } = require('./controller');

Router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = Router