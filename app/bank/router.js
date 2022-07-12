const Router = require('express').Router();

const { index, createBank, storeBank, editBank, updateBank, deleteBank } = require('./controller');

Router.get('/', index);
Router.get('/create', createBank);
Router.post('/store', storeBank);
Router.get('/edit/:id', editBank);
Router.put('/update/:id', updateBank);
Router.delete('/delete/:id', deleteBank);


module.exports = Router