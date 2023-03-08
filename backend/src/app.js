const path = require('path');
const express = require('express');
const Logerror = require('./util/ErrorHandler');
const bodyparser = require('body-parser');
const authCheck = require('./api/middleware/authcheck')
require('dotenv').config();
const ob = require('./util/Logger')
const logger = ob.logger;

const ROOT_DIR = path.join(__dirname, '..');

const app = express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use('/static',express.static(path.join(ROOT_DIR, 'public')))
app.use('/favicon.ico', express.static(path.join(ROOT_DIR, 'public/favicon.ico'))); // favicon.


const loginRouter = require("./routes/login")
const homepageRouter = require("./routes/homepage")
const applicantsRouter = require("./routes/applicants")

app.set('views',__dirname + '/views')
app.set("view engine", "ejs")

const registrationRouter = require('./routes/registration')
const applicationsRouter = require('./routes/applications')
const logoutRouter = require('./routes/logout')
const createApplicationRouter = require('./routes/createapplication')

app.use(authCheck); // important this comes before any routers!

app.use("/", homepageRouter)
app.use("/applicant", applicantsRouter)
app.use("/applications", applicationsRouter)
app.use('/register',registrationRouter);
app.use('/login',loginRouter);
app.use('/logout', logoutRouter);
app.use('/createApplication', createApplicationRouter)

app.get('/', (req, res, next) => {
    jsonResponse = {'success':{'msg': 'api call success!'}}
    res.json(jsonResponse);
});

// Get request for nonexistant route, causes error
app.get('*', (req, res, next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error);
});

const db = require("./util/database")
db.authenticate().then(() => console.log('Database connected!')).catch(err => console.log(err))

app.use((error, req, res, next) => {
    if (error.status === 404) {
        res.status(404).json({message: 'Page not found'});
    } else if (error.status === 500) {
        res.status(500).json({message: 'Internal Server Error'});
    } else if (error.status === 503) {
        res.status(503).json({message: 'Service Unavailable'});
    } else if (error.status === 505) {
        res.status(505).json({message: 'HTTP Version Not Supported'});
    } else {
        Logerror(error, req, res, next);
    }
});

// Test database connection
db.authenticate()
  .then(() => {
    logger.info('Successfully connected to database.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
    process.exit(1);
  });



// Handle 404, 500, 503, and 505 errors
app.use(function(err, req, res, next) {
    if (err.status === 404) {
      res.status(404).send('404: Page not found');
    } else if (err.status === 500) {
      res.status(500).send('500: Internal Server Error');
    } else if (err.status === 503) {
      res.status(503).send('503: Service Unavailable');
    } else if (err.status === 505) {
      res.status(505).send('505: HTTP Version Not Supported');
    } else {
      next(err);
    }
  });

  module.exports = app;