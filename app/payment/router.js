const Router = require('express').Router();

const { index, createPayment, storePayment, editPayment, updatePayment, deletePayment } = require('./controller');

Router.get('/', index);
Router.get('/create', createPayment);
Router.post('/store', storePayment);
Router.get('/edit/:id', editPayment);
Router.put('/update/:id', updatePayment);
Router.delete('/delete/:id', deletePayment);


module.exports = Router