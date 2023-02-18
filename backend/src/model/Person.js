const Sequelize = require("sequelize");
const sequelize = require("../../src/util/database");

const Person = sequelize.define("person", {
        person_id: {
            type: Sequelize.INTEGER,
    
            primaryKey: true,
           
        },
        name: {
            type: Sequelize.STRING,
          
            
        },
        surname: {
            type: Sequelize.STRING,
           
           
        },
        pnr: {
            type: Sequelize.STRING,
           
           
        },
        email: {
            type: Sequelize.STRING,
           
           
        },
        password: {
            type: Sequelize.STRING,
            
            
        },
        role_id: {
            type: Sequelize.INTEGER,
            
            
        },
        username: {
            type: Sequelize.STRING,
        }
});

module.exports = Person
