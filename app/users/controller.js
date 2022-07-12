const User = require('./model');
const bcrypt = require('bcryptjs');
const { setAlertAndRedirect, getAlertMessage } = require('../helpers/alert');

function viewSignin(req, res) {
  const alert = getAlertMessage(req);
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.render('auth/signin', { title: 'Login', alert });
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const checkByEmail = await User.findOne({ email: email });

    if (checkByEmail) {
      if (checkByEmail.status === 'Y') {
        const checkPassword = await bcrypt.compare(password, checkByEmail.password);
        if (checkPassword) {
          const { id, email, status, name } = checkByEmail;
          req.session.user = { id, email, status, name };
          res.redirect('/dashboard');
        } else {
          setAlertAndRedirect({ req, res }, 'Your input doesnt match our credentials', '/auth/signin');
        }
      } else {
        setAlertAndRedirect({ req, res }, 'Your account isn\'t active yet', '/auth/signin');
      }
    } else {
      setAlertAndRedirect({ req, res }, 'Your input doesnt match our credentials', '/auth/signin');
    }

    setAlertAndRedirect({ req, res }, 'Berhasil tambah payment', '/payment', 'success');
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/payment');
    throw error;
  }
}

module.exports = {
  viewSignin,
  signin
}