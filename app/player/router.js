const Router = require('express').Router();

const { landingPage, detailPage } = require('./controller');

Router.get('/landingpage', landingPage);
Router.get('/:id/detail', detailPage);


module.exports = Router