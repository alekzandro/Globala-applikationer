const Sequelize = require("sequelize");
const sequelize = require("../../src/util/database");

const Competence_profile = sequelize.define("competence_profile", {
    competence_profile_id: {
        type: Sequelize.INTEGER,
           
            primaryKey: true,
    },
    person_id: {
        type: Sequelize.INTEGER,
           
    },
    competence_id: {
        type: Sequelize.INTEGER,
           
    },
   years_of_experience: {
        type: Sequelize.DOUBLE,
         
    }

});

module.exports = Competence_profile