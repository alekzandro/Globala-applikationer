/*
In the findApplications method, we added an error handling for when no person is found in the database
*/ 


const Person = require('../model/Person');
const Competence = require('../model/Competence');
const Competence_profile = require('../model/Competence_profile');

const Availability = require('../model/Availability');
const ApplicationDTO = require('../model/ApplicationDTO');
const competenceDTO = require('../model/competenceDTO');
const sequelize = require('../util/database')


class ApplicationDAO {


    async findApplications(nrOfApplications) {
        const transaction = await sequelize.transaction();
        try {       
            const result = await Person.findAll();
            if (result.length === 0) {
                throw new Error("No person found.");
            }
            const applications = [];
            for (let i = 0; i < nrOfApplications && i < result.length; i++) {
                applications[i] = this.createApplicationDTO(result[i], "test", "test");
            }
            transaction.commit();            
            return applications           
        } catch (error){
            transaction.rollback();
            console.log(error);
            throw new Error("Failed to retrieve applications.");
        }
    }

    async getCompetencies () {
        try {
            const result = await Competence.findAll();
            const DTOs = result.map(e => new competenceDTO(e.competence_id, e.name))
            return DTOs;
        } catch (error) {
            throw error;
        }
    }

    createApplicationDTO(personModel, competence_profile_model, availabilityModel) {
        return new ApplicationDTO(
            personModel.name,
            personModel.surname,
            personModel.email,
            competence_profile_model,
            availabilityModel
        );
    }
}

module.exports = ApplicationDAO; 


