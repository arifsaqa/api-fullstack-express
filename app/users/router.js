const Router = require('express').Router();

const { viewSignin, signin } = require('./controller');

Router.get('/signin', viewSignin);
Router.post('/signin-with-credentials', signin);

module.exports = Router