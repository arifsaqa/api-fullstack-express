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
    const vouchers = await Voucher.find()
      .populate('category')
      .populate('nominals');
    if (req.headers.ajax) {
      res.render('admin/voucher/table', { vouchers, alert });
    } else {
      res.render('admin/voucher/view_voucher', { vouchers, alert });
    }
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/voucher');
    throw error;
  }
}

async function createVoucher(req, res) {
  const categories = await Category.find();
  const nominals = await Nominal.find();
  res.render('admin/voucher/create', { categories, nominals })
}

async function storeVoucher(req, res) {
  try {
    const { name, category, nominals, user } = req.body;

    if (req.file) {
      console.log('\x1b[33m%s\x1b[0m', 'fileeeeeeeeeeeeee', req.file, req.body);
      const tempPath = req.file.path;
      const splitFile = req.file.originalname.split('.');
      const originExt = splitFile[splitFile.length - 1];
      const fileName = req.file.filename + '.' + originExt;
      const target_path = path.resolve(ROOT_PATH, `public/uploads/${fileName}`);
      const src = fs.createReadStream(tempPath);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);
      src.on("error", (err) => {
        console.log('\x1b[41m', err);
      });
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
          setAlertAndRedirect({ req, res }, 'Berhasil tambah voucher', '/voucher', 'success')
        } catch (error) {
          setAlertAndRedirect({ req, res }, 'Gagal tambah voucher', '/voucher')
        }
      });
    } else {
      const voucher = await Voucher({ name, category, nominals, user });
      await voucher.save();
    }
    setAlertAndRedirect({ req, res }, 'Berhasil tambah voucher', '/voucher', 'success');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/voucher');
    throw error;
  }
}

async function editVoucher(req, res) {
  const { id } = req.params;
  const categories = await Category.find();
  const nominals = await Nominal.find();
  const voucher = await Voucher.findOne({ _id: id })
    .populate('category')
    .populate('nominals');
  const voucher_nominals = voucher.nominals;
  res.render('admin/voucher/create', { voucher, categories, nominals })
}

async function updateVoucher(req, res) {
  try {
    const { id } = req.params;
    const { name, category, thumbnail, nominals, user } = req.body;
    console.log("requessssssst", req.body);
    if (req.file) {
      const tempPath = req.file.path;
      const splitFile = req.file.originalname.split('.');
      const originExt = splitFile[splitFile.length - 1];
      const fileName = req.file.filename + '.' + originExt;
      const target_path = path.resolve(ROOT_PATH, `public/uploads/${fileName}`);
      const src = fs.createReadStream(tempPath);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);
      src.on("error", (err) => {
        console.log('\x1b[41m', err);
      });
      src.on("end", async () => {
        try {
          const voucher = await Voucher.findOne({ _id: id });

          const currentImage = `${ROOT_PATH}/public/uploads/${voucher.thumbnail}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }
          await Voucher.findOneAndUpdate({
            _id: id
          }, {
            name,
            category,
            thumbnail: fileName,
            nominals,
            user
          });
          setAlertAndRedirect({ req, res }, 'Berhasil tambah voucher', '/voucher', 'success')
        } catch (error) {
          setAlertAndRedirect({ req, res }, 'Gagal tambah voucher', '/voucher')
        }
      });
    } else {
      await Voucher.findOneAndUpdate({
        _id: id
      }, {
        name,
        category,
        nominals,
        user
      });
    }
    setAlertAndRedirect({ req, res }, 'Berhasil update voucher', '/voucher', 'success');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/voucher');
    throw error;
  }
}

async function deleteVoucher(req, res) {
  try {
    const { id } = req.params;
    const voucher = await Voucher.findOne({ _id: id });

    const currentImage = `${ROOT_PATH}/public/uploads/${voucher.thumbnail}`;
    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    await Voucher.findByIdAndDelete({
      _id: id
    });
    setAlertAndRedirect({ req, res }, 'Berhasil hapus voucher', '/voucher', 'success');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/voucher');
    throw error;
  }
}

async function updateStatusVoucher(req, res) {
  try {
    const { id } = req.params;
    const voucher = await Voucher.findOne({ _id: id });
    const status = voucher.status === "Y" ? "N" : "Y";
    await Voucher.findOneAndUpdate({ _id: id }, { status });
    res.json({ status: 200, message: `Successfully ${status == "Y" ? 'activate' : 'deactivate'} the voucher`, voucher_status: status }).status(200);
  } catch (error) {
    res.json({ status: 500, message: 'failed updating the voucher!' }).status(500);
  }

}

module.exports = {
  index,
  createVoucher,
  storeVoucher,
  editVoucher,
  updateVoucher,
  deleteVoucher,
  updateStatusVoucher
}