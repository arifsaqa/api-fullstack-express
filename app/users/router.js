const Router = require('express').Router();

const { viewSignin, signin, signOut } = require('./controller');

Router.get('/signin', viewSignin);
Router.post('/signin-with-credentials', signin);
Router.get('/signout', signOut)

module.exports = Router