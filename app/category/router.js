const Router = require('express').Router();

const { index, createCategory, storeCategory } = require('./controller');

Router.get('/', index);
Router.get('/create', createCategory);
Router.post('/store', storeCategory)

module.exports = Router