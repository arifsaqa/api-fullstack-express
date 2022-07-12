const { setAlertAndRedirect } = require("../helpers/alert");

function isLoginAdmin(req, res, next) {
  if (req.session.user === null || req.session.user === undefined) {
    setAlertAndRedirect({req, res}, 'Your session is expired','/auth/signin');
  }
  next();
}

module.exports = {
  isLoginAdmin
}