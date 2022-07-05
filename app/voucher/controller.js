const Voucher = require('./model')
const Category = require('../category/model')
const Nominal = require('../nominal/model')
const { setAlertAndRedirect, getAlertMessage } = require('../helpers/alert');
const { ROOT_PATH } = require('../../config');
const fs = require('fs');
const path = require('path');


async function index(req, res) {
  try {
    const alert = getAlertMessage(req);
    const vouchers = await Voucher.find();
    res.render('admin/voucher/view_voucher', { vouchers, alert });
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/voucher');
    throw error;
  }
}

async function createVoucher(req, res) {
  const categories = await Category.find();
  const nominals = await Nominal.find();

  res.render('admin/voucher/create', {categories, nominals})
}

async function storeVoucher(req, res) {
  try {
    const { name, category, nominals, user } = req.body;

    if (req.file) {
      console.log('\x1b[33m%s\x1b[0m','fileeeeeeeeeeeeee',req.file, req.body);
      const tempPath = req.file.path;
      const splitFile = req.file.originalname.split('.');
      const originExt = splitFile[splitFile.length - 1];
      const fileName = req.file.filename + '.' + originExt;
      const target_path = path.resolve(ROOT_PATH, `public/uploads/${fileName}`);
      const src = fs.createReadStream(tempPath);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);
      src.on("error", (err) => {
        console.log('\x1b[41m',err);
      }) ;
      src.on("end", async () => {
        console.log('\x1b[33m%s\x1b[0m', 'endddddddddddddddd')
        try {
          const voucher = await Voucher({
            name, 
            category, 
            thumbnail: fileName, 
            nominals, 
            user
          });
          await voucher.save();
          setAlertAndRedirect({req,res}, 'Berhasil tambah voucher', '/voucher', 'success')
        } catch (error) {
          setAlertAndRedirect({ req, res }, 'Gagal tambah voucher', '/voucher')
        }
      }) ;
    } else {
      const voucher = await Voucher({ name, category, nominals, user });
      await voucher.save();
    }


    setAlertAndRedirect({ req, res }, 'Berhasil tambah voucher', '/voucher', 'success');
    // res.redirect('/voucher');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/voucher');
    throw error;
  }
}

async function editVoucher(req, res) {
  const { id } = req.params;
  const voucher = await Voucher.findOne({ _id: id });
  res.render('admin/voucher/create', { voucher });
}

async function updateVoucher(req, res) {
  try {
    const { id } = req.params;
    const { name, category, thumbnail, nominals, user } = req.body;
    const voucher = await Voucher.findByIdAndUpdate({
      _id: id
    }, { name, category, thumbnail, nominals, user });
    setAlertAndRedirect({ req, res }, 'Berhasil update voucher', '/voucher', 'success');
    // res.redirect('/voucher');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/voucher');
    throw error;
  }
}

async function deleteVoucher(req, res) {
  try {
    const { id } = req.params;
    const voucher = await Voucher.findByIdAndDelete({
      _id: id
    });
    setAlertAndRedirect({ req, res }, 'Berhasil hapus voucher', '/voucher', 'success');
    // res.redirect('/voucher');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/voucher');
    throw error;
  }
}

module.exports = {
  index,
  createVoucher,
  storeVoucher,
  editVoucher,
  updateVoucher,
  deleteVoucher
}