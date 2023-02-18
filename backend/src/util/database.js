const Sequelize = require('sequelize');
require('dotenv').config();


module.exports = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433,
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