const Transaction = require('./model')
const { setAlertAndRedirect, getAlertMessage } = require('../helpers/alert');


async function index(req, res) {
  try {
    const alert = getAlertMessage(req);
    const transactions = await Transaction.find();
    console.log(transactions);
    if (req.headers.ajax) {
      res.render('admin/transaction/table', { transactions, alert });
    } else {
      res.render('admin/transaction/view_transaction', {
        transactions, alert, title: 'Transaction',
        name: req.session.user.name
      });
    }
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/transaction');
    throw error;
  }
}

function createTransaction(req, res) {
  // const { id } = req.body;
  res.render('admin/transaction/create', {
    title: 'Transaction',
    name: req.session.user.name
  })
}

async function storeTransaction(req, res) {
  try {
    const { cointName, cointQuantity, price } = req.body;
    const transaction = await Transaction({ cointName, cointQuantity, price });
    await transaction.save();

    setAlertAndRedirect({ req, res }, 'Berhasil tambah transaction', '/transaction', 'success');
    // res.redirect('/transaction');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/transaction');
    throw error;
  }
}

async function editTransaction(req, res) {
  const { id } = req.params;
  const transaction = await Transaction.findOne({ _id: id });
  res.render('admin/transaction/create', {
    transaction, title: 'Transaction',
    name: req.session.user.name
  });
}

async function updateTransaction(req, res) {
  try {
    const { id } = req.params;
    const { cointName, cointQuantity, price } = req.body;
    const transaction = await Transaction.findByIdAndUpdate({
      _id: id
    }, { cointName, cointQuantity, price });
    setAlertAndRedirect({ req, res }, 'Berhasil update transaction', '/transaction', 'success');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/transaction');
    throw error;
  }
}

async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete({
      _id: id
    });
    setAlertAndRedirect({ req, res }, 'Berhasil hapus transaction', '/transaction', 'success');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/transaction');
    throw error;
  }
}

async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.query;
    await Transaction.findByIdAndUpdate({ _id: id }, { status });
    setAlertAndRedirect({ req, res }, `Transaction is successfully ${status =='failed'?'rejected':'accepted'}.`, '/transaction', 'success');
  } catch (error) {
    
  }
}

module.exports = {
  index,
  createTransaction,
  storeTransaction,
  editTransaction,
  updateTransaction,
  deleteTransaction,
  updateStatus
}