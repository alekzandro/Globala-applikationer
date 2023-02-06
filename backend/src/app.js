const path = require('path');
const express = require('express');
const Logerror = require('./util/ErrorHandler');

const ROOT_DIR = path.join(__dirname, '..');

const app = express();

app.use('/static',express.static(path.join(ROOT_DIR, 'public')))

app.get('/', (req, res) => {
    res.send('Server is up')
});

app.get('*', (req, res, next) => {
    next(new Error('page_not_found'));
});

app.use(Logerror);

module.exports = app;