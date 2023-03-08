/**

    ApplicationDAO class provides methods to handle applications related data access.
    @class
    */

const Person = require('../model/Person');
const Competence = require('../model/Competence');
const Competence_profile = require('../model/Competence_profile');

const Availability = require('../model/Availability');
const ApplicationDTO = require('../model/ApplicationDTO');
const competenceDTO = require('../model/competenceDTO');
const sequelize = require('../util/database')


class ApplicationDAO {

/**

    Retrieves applications from the database.
    @async
    @function
    @param {number} nrOfApplications - The number of applications to retrieve.
    @throws {Error} If no person is found.
    @returns {Promise<Array<ApplicationDTO>>} An array of ApplicationDTOs.
    */
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
/**

    Retrieves competencies from the database.
    @async
    @function
    @returns {Promise<Array<competenceDTO>>} An array of competenceDTOs.
    @throws {Error} If an error occurs while retrieving competencies.
    */
    async getCompetencies () {
        try {
            const result = await Competence.findAll();
            const DTOs = result.map(e => new competenceDTO(e.competence_id, e.name))
            return DTOs;
        } catch (error) {
            throw error;
        }
    }
/**

    Creates an ApplicationDTO from Person, Competence_profile, and Availability models.
    @function
    @param {Person} personModel - A Person model instance.
    @param {Competence_profile} competence_profile_model - A Competence_profile model instance.
    @param {Availability} availabilityModel - An Availability model instance.
    @returns {ApplicationDTO} An ApplicationDTO instance.
    */
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


