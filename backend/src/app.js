const path = require('path');
const express = require('express');
const Logerror = require('./util/ErrorHandler');
const bodyparser = require('body-parser');
const authCheck = require('./api/middleware/authcheck')
require('dotenv').config();

const ROOT_DIR = path.join(__dirname, '..');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const homepageRouter = require("./routes/homepage")
const applicantsRouter = require("./routes/applicants")

app.set('views',__dirname + '/views')
app.set("view engine", "ejs")

const registrationRouter = require('./routes/registration')

app.use(authCheck); // important this comes before any routers!

app.use("/", homepageRouter)
app.use("/applicant", applicantsRouter)
app.use('/register',registrationRouter);

app.use('/static',express.static(path.join(ROOT_DIR, 'public')))

app.get('/', (req, res, next) => {
    jsonResponse = {'success':{'msg': 'api call success!'}}
    res.json(jsonResponse);
});

// Get request for nonexistant route, causes error
app.get('*', (req, res, next) => {
    next(new Error('page_not_found'));
});

app.use(Logerror);

module.exports = app;
