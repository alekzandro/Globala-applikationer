const Sequelize = require("sequelize");
const sequelize = require("../../src/util/database");

const Competence_profile = sequelize.define("competence_profile", {
    competence_profile_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    person_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Person', 
            key: 'person_id',
          }           
    },
    competence_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Competence', 
          key: 'competence_id',
        }
    },
   years_of_experience: {
        type: Sequelize.DOUBLE,
         
    }

});

module.exports = Competence_profile