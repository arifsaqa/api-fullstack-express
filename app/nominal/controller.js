const Nominal = require('./model')
const { setAlertAndRedirect, getAlertMessage } = require('../helpers/alert');


async function index(req, res) {
  try {
    const alert = getAlertMessage(req);
    const nominals = await Nominal.find();
    if (req.headers.ajax) {
      res.render('admin/nominal/table', { nominals, alert });
    } else {
      res.render('admin/nominal/view_nominal', {
        nominals, alert, title: 'Nominal',
        name: req.session.user.name
      });
    }
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/nominal');
    throw error;
  }
}

function createNominal(req, res) {
  // const { id } = req.body;
  res.render('admin/nominal/create', {
    title: 'Nominal',
    name: req.session.user.name
  })
}

async function storeNominal(req, res) {
  try {
    const { cointName, cointQuantity, price } = req.body;
    const nominal = await Nominal({ cointName, cointQuantity, price });
    await nominal.save();

    setAlertAndRedirect({ req, res }, 'Berhasil tambah nominal', '/nominal', 'success');
    // res.redirect('/nominal');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/nominal');
    throw error;
  }
}

async function editNominal(req, res) {
  const { id } = req.params;
  const nominal = await Nominal.findOne({ _id: id });
  res.render('admin/nominal/create', {
    nominal, title: 'Nominal',
    name: req.session.user.name
  });
}

async function updateNominal(req, res) {
  try {
    const { id } = req.params;
    const { cointName, cointQuantity, price } = req.body;
    const nominal = await Nominal.findByIdAndUpdate({
      _id: id
    }, { cointName, cointQuantity, price });
    setAlertAndRedirect({ req, res }, 'Berhasil update nominal', '/nominal', 'success');
    // res.redirect('/nominal');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/nominal');
    throw error;
  }
}

async function deleteNominal(req, res) {
  try {
    const { id } = req.params;
    const nominal = await Nominal.findByIdAndDelete({
      _id: id
    });
    setAlertAndRedirect({ req, res }, 'Berhasil hapus nominal', '/nominal', 'success');
    // res.redirect('/nominal');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/nominal');
    throw error;
  }
}

module.exports = {
  index,
  createNominal,
  storeNominal,
  editNominal,
  updateNominal,
  deleteNominal
}