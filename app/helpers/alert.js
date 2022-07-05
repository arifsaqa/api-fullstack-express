
/**
 * 
 * @param {{req, res}} reqRes 
 * @param {string} message 
 * @param {string} redirect 
 * @param {'danger'|'success'} status 
 */
function setAlertAndRedirect(reqRes, message, redirect, status = 'danger') {
  const { req, res } = reqRes;
  req.flash('alertMessage', message);
  req.flash('alertStatus', status);
  res.redirect(redirect)
}

/**
 *@param {{flash()}} req 
 * @return {{message,status}}
 */
function getAlertMessage(req) {
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash('alertStatus');
  return{ message: alertMessage, status: alertStatus };
}
module.exports = { setAlertAndRedirect, getAlertMessage };