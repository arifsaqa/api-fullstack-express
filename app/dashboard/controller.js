function index(req, res) {
  console.log("req.session.user", req.session.user);
  res.render('index', {
    title: 'Dashboard',
    name: req.session.user.name
  });
}

module.exports = {
  index
}