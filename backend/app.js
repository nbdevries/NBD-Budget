var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// API setup - required libraries
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

// API setup - routing
var ExpensesRouter = require('./routes/ExpensesRouter')
var IncomesRouter = require('./routes/IncomesRouter')
var DebtsRouter = require('./routes/DebtsRouter')
var DebtObligationsRouter = require('./routes/DebtObligationsRouter')
var OverviewRouter = require('./routes/OverviewRouter')
app.use('/expenses', ExpensesRouter)
app.use('/incomes', IncomesRouter)
app.use('/debts', DebtsRouter)
app.use('/debtobligations', DebtObligationsRouter)
app.use('/overview', OverviewRouter)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
