const Router = require('express').Router();

const { index, createTransaction, storeTransaction, editTransaction, updateTransaction, deleteTransaction, updateStatus } = require('./controller');

Router.get('/', index);
Router.get('/create', createTransaction);
Router.post('/store', storeTransaction);
Router.get('/edit/:id', editTransaction);
Router.put('/update/:id', updateTransaction);
Router.delete('/delete/:id', deleteTransaction);
Router.put('/status/:id', updateStatus);


module.exports = Router