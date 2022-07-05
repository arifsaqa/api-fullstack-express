const Router = require('express').Router();

const { index, createNominal, storeNominal, editNominal, updateNominal, deleteNominal } = require('./controller');

Router.get('/', index);
Router.get('/create', createNominal);
Router.post('/store', storeNominal);
Router.get('/edit/:id', editNominal);
Router.put('/update/:id', updateNominal);
Router.delete('/delete/:id', deleteNominal);


module.exports = Router