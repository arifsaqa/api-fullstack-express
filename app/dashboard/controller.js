function index(req, res) {
  res.render('index', {
    title: 'Dashboard',
    name: req.session.user.name
  });
}

module.exports = {
  index
}