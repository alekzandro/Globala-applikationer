const Sequelize = require("sequelize");
const sequelize = require("../../src/util/database");

const Role = sequelize.define("role", {
    role_id: {
        type: Sequelize.INTEGER,
            
            primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
          
    },
});

module.exports = Role