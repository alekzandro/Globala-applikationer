const Sequelize = require('sequelize');

class RegDAO {
    constructor () {
        this.database = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {host: process.env.DB_HOST, dialect: 'postgres'}
        );
    }

    async test_connection (){
        try {
            await this.database.authenticate();
            console.log("SUCESS");
        } catch (error) {
            console.log ("FAIL");
        }
    }
}

module.exports = {RegDAO}


