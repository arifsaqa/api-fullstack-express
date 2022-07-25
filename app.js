var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

//helper for view
const rupiahFormat = require('./app/helpers/rupiahFormat');

var categoryRouter = require('./app/category/router');
var dashboardRouter = require('./app/dashboard/router');
var nominalRouter = require('./app/nominal/router');
var voucherRouter = require('./app/voucher/router');
var bankRouter = require('./app/bank/router');
var paymentRouter = require('./app/payment/router');
var usersRouter = require('./app/users/router');
var transactionRouter = require('./app/transaction/router');
var playerRouter = require('./app/player/router');
const { isLoginAdmin } = require('./app/middleware/auth');


var app = express();
const URL = '/api/v1';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

app.locals.rupiahFormat = rupiahFormat;
app.use(flash());
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte', express.static(path.join(__dirname, '/node_modules/admin-lte')))

app.use('/auth', usersRouter);
app.use('/', dashboardRouter);
app.use('/dashboard', isLoginAdmin, dashboardRouter);
app.use('/category', isLoginAdmin, categoryRouter);
app.use('/nominal', isLoginAdmin, nominalRouter);
app.use('/voucher', isLoginAdmin, voucherRouter);
app.use('/bank', isLoginAdmin, bankRouter);
app.use('/payment', isLoginAdmin, paymentRouter);
app.use('/transaction', isLoginAdmin, transactionRouter);

//api
app.use(`${URL}/players`, playerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
