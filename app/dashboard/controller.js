const Transaction =  require('../transaction/model');
const Voucher =  require('../voucher/model');
const Player =  require('../player/model');
const Category =  require('../category/model');


async function index(req, res) {

  const transactions = await Transaction.countDocuments();
  const vouchers = await Voucher.countDocuments();
  const players = await Player.countDocuments();
  const categories = await Category.countDocuments();

  console.log(transactions);

  res.render('admin/dashboard/dashboard_view', {
    title: 'Dashboard',
    name: req.session.user.name,
    transactions,
    vouchers,
    categories,
    players
  });
}

module.exports = {
  index
}