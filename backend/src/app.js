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

const loginRouter = require("./routes/login")
const homepageRouter = require("./routes/homepage")
const applicantsRouter = require("./routes/applicants")

app.set('views',__dirname + '/views')
app.set("view engine", "ejs")

const registrationRouter = require('./routes/registration')
const applicationsRouter = require('./routes/applications')
const logoutRouter = require('./routes/logout')

app.use(authCheck); // important this comes before any routers!

app.use("/", homepageRouter)
app.use("/applicant", applicantsRouter)
app.use("/applications", applicationsRouter)
app.use('/register',registrationRouter);
app.use('/login',loginRouter);
app.use('/logout', logoutRouter);

app.use('/static',express.static(path.join(ROOT_DIR, 'public')))

app.get('/', (req, res, next) => {
    jsonResponse = {'success':{'msg': 'api call success!'}}
    res.json(jsonResponse);
});

// Get request for nonexistant route, causes error
app.get('*', (req, res, next) => {
    next(new Error('page_not_found'));
});
const db = require("./util/database")
db.authenticate().then(() => console.log('Database connected!')).catch(err => console.log(err))

app.use(Logerror);

module.exports = app;
