const Router = require('express').Router();
const multer = require('multer');
const os = require('os');
const fileMiddleware = multer({ dest: os.tmpdir(), limits: { fieldSize: 10 * 1024 * 1024 } });

const { index, createVoucher, storeVoucher, editVoucher, updateVoucher, deleteVoucher, updateStatusVoucher } = require('./controller');

Router.get('/', index);
Router.get('/create', createVoucher);
Router.post('/store', fileMiddleware.single('image'), storeVoucher);
Router.get('/edit/:id', editVoucher);
Router.put('/update/:id', fileMiddleware.single('image'), updateVoucher);
Router.delete('/delete/:id', deleteVoucher);
Router.patch('/update-status/:id', updateStatusVoucher);

module.exports = Router