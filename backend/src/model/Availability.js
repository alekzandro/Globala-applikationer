const Sequelize = require("sequelize");
const sequelize = require("../../src/util/database");

const Availability = sequelize.define("availabilities", {
    availability_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    person_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Person',
            key: 'person_id'
        }
           
    },
    from_date: {
        type: Sequelize.DATE,
            
    },
    to_date: {
        type: Sequelize.DATE,
            
    },
});

module.exports = Availability