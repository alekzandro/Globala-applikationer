const Sequelize = require("sequelize");
const sequelize = require("../../src/util/database");

const Availability = sequelize.define("availability", {
    availability_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    person_id: {
        type: Sequelize.INTEGER,
           
    },
    from_date: {
        type: Sequelize.DATE,
            
    },
    to_date: {
        type: Sequelize.DATE,
            
    },
});

module.exports = Availability