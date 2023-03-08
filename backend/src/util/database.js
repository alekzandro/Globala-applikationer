/**

    Sequelize database instance
    @typedef {Object} SequelizeInstance
    @property {Function} authenticate - Authenticates connection
    @property {Function} define - Defines a new model
    */
const Sequelize = require('sequelize');
require('dotenv').config();

/**

    Creates a new Sequelize instance depending on whether the runtime is production or development

    @type {SequelizeInstance} Sequelize instance
    */
module.exports = process.env.DATABASE_URL? 
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
}):new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
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