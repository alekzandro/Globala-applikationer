/*const Sequelize = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST||'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT||5433,
    operatorAliases: false,
    define: {
        timestamps: false
      },

    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

*/

 const Sequelize = require('sequelize');
require('dotenv').config();

const logger = require('../util/logger'); // import your logger module here

// Generated sequalize instance depends on if we are on production
// or a dev runtime.
const sequelize = process.env.DATABASE_URL ? 
  new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    operatorAliases: false,
    define: {
      timestamps: false
    }
  }) : new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5433,
    operatorAliases: false,
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    logger.info('Successfully connected to database.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
    process.exit(1);
  });

module.exports = sequelize;

// Handle 404, 500, 503, and 505 errors
router.use(function(err, req, res, next) {
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