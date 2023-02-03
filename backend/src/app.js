const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Server is up')});

module.exports = app;