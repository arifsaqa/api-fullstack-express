const Payment = require('./model')
const Bank = require('../bank/model');
const { setAlertAndRedirect, getAlertMessage } = require('../helpers/alert');


async function index(req, res) {
  try {
    const alert = getAlertMessage(req);
    const payments = await Payment.find()
      .populate('banks');
    if (req.headers.ajax) {
      res.render('admin/payment/table', { payments, alert });
    } else {
      res.render('admin/payment/view_payment', {
        payments, alert, title: 'Payment',
        name: req.session.user.name
      });
    }
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/payment');
    throw error;
  }
}

async function createPayment(req, res) {
  const banks = await Bank.find();
  res.render('admin/payment/create', {
    banks, title: 'Payment',
    name: req.session.user.name
  })
}

async function storePayment(req, res) {
  try {
    const { type, status, banks } = req.body;
    const payment = await Payment({ type, status, banks });
    await payment.save();

    setAlertAndRedirect({ req, res }, 'Berhasil tambah payment', '/payment', 'success');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/payment');
    throw error;
  }
}

async function editPayment(req, res) {
  const { id } = req.params;
  const banks = await Bank.find();
  const payment = await Payment.findOne({ _id: id })
    .populate('banks');
  res.render('admin/payment/create', {
    payment, banks, title: 'Payment',
    name: req.session.user.name
  });
}

async function updatePayment(req, res) {
  try {
    const { id } = req.params;
    const { type, status, banks } = req.body;
    const payment = await Payment.findByIdAndUpdate({
      _id: id
    }, { type, status, banks });
    setAlertAndRedirect({ req, res }, 'Berhasil update payment', '/payment', 'success');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/payment');
    throw error;
  }
}

async function deletePayment(req, res) {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete({
      _id: id
    });
    setAlertAndRedirect({ req, res }, 'Berhasil hapus payment', '/payment', 'success');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/payment');
    throw error;
  }
}

module.exports = {
  index,
  createPayment,
  storePayment,
  editPayment,
  updatePayment,
  deletePayment
}