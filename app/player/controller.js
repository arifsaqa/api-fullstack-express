const Player = require('./model');
const Voucher = require('../voucher/model');

async function landingPage(req, res) {
  try {
    const vouchers = await Voucher.find()
      .select('_id name status category thumbnail')
      .populate('category');

    res.status(200).json({ data: vouchers });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}

async function detailPage(req, res) {
  try {
    const { id } = req.params;
    const voucher = await Voucher.findOne({ _id: id })
      .populate('category')
      .populate('nominals')
      .populate('user', '_id name phoneNumber');
    if (!voucher) {
      res.status(404).json({ message: 'Voucher\'s not found' });
    }

    res.status(200).json({ data: voucher });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}

module.exports = {
  landingPage,
  detailPage
}