const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Server listening: http://localhost:${port}`));
module.exports = app;
