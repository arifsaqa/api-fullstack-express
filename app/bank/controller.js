const Bank = require('./model')
const { setAlertAndRedirect, getAlertMessage } = require('../helpers/alert');


async function index(req, res) {
  try {
    const alert = getAlertMessage(req);
    const banks = await Bank.find();
    if (req.headers.ajax) {
      res.render('admin/bank/table', { banks, alert });
    } else {
      res.render('admin/bank/view_bank', {
        banks, alert, title: 'Bank',
        name: req.session.user.name
      });
    }
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/bank');
    throw error;
  }
}

function createBank(req, res) {
  res.render('admin/bank/create', {
    title: 'Bank',
    name: req.session.user.name
  })
}

async function storeBank(req, res) {
  try {
    const { ownerName, bankName, bankNumber } = req.body;
    const bank = await Bank({ ownerName, bankName, bankNumber });
    await bank.save();

    setAlertAndRedirect({ req, res }, 'Berhasil tambah bank', '/bank', 'success');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/bank');
    throw error;
  }
}

async function editBank(req, res) {
  const { id } = req.params;
  const bank = await Bank.findOne({ _id: id });
  res.render('admin/bank/create', {
    bank, title: 'Bank',
    name: req.session.user.name
  });
}

async function updateBank(req, res) {
  try {
    const { id } = req.params;
    const { ownerName, bankName, bankNumber } = req.body;
    const bank = await Bank.findByIdAndUpdate({
      _id: id
    }, { ownerName, bankName, bankNumber });
    setAlertAndRedirect({ req, res }, 'Berhasil update bank', '/bank', 'success');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/bank');
    throw error;
  }
}

async function deleteBank(req, res) {
  try {
    const { id } = req.params;
    const bank = await Bank.findByIdAndDelete({
      _id: id
    });
    setAlertAndRedirect({ req, res }, 'Berhasil hapus bank', '/bank', 'success');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/bank');
    throw error;
  }
}

module.exports = {
  index,
  createBank,
  storeBank,
  editBank,
  updateBank,
  deleteBank
}