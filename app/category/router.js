const Router = require('express').Router();

const { index, createCategory, storeCategory, editCategory, updateCategory, deleteCategory } = require('./controller');

Router.get('/', index);
Router.get('/create', createCategory);
Router.post('/store', storeCategory);
Router.get('/edit/:id', editCategory);
Router.put('/update/:id', updateCategory);
Router.delete('/delete/:id', deleteCategory);


module.exports = Router