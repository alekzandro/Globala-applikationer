/*
In the findApplications method, we added an error handling for when no person is found in the database
*/ 


const Person = require('../model/Person');
const Competence = require('../model/Competence');
const Competence_profile = require('../model/Competence_profile');

const Availability = require('../model/Availability');
const ApplicationDTO = require('../model/ApplicationDTO');
const competenceDTO = require('../model/competenceDTO');
const sequelize = require('../util/database');
const AvailabilityDTO = require('../model/AvailabilityDTO');
const ProfileDTO = require('../model/ProfileDTO');


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

    async availabilitesByPersonId (person_id){
        try {
            const availabilites = await Availability.findAll({
                where: {
                    person_id: person_id
                }
            })
            const DTOs = availabilites.map(e => new AvailabilityDTO(e.availability_id,
                e.person_id, e.from_date, e.to_date))
            return DTOs;
        } catch (error) {
            throw error;
        }
    }

    async competencyByPersonId (person_id){
        try {
            const result = await Competence_profile.findAll({
                where: {
                    person_id: person_id
                }
            })
            const DTOs = result.map(e => new ProfileDTO(e.competence_profile_id,
                e.person_id, e.competence_id, e.years_of_experience));
            return DTOs;
        } catch (error) {
            throw error;
        }
    }

    async insertAvailability (person_id, from_date, to_date){
        try {
            const avail = await Availability.create({
                person_id: person_id,
                from_date: from_date,
                to_date: to_date,
            })
        } catch (error) {
            throw error;
        }
    }

    async insertCompetency (person_id, competence_id, years_of_experience){
        try {
            const comp = await Competence_profile.create({
                person_id: person_id,
                competence_id: competence_id,
                years_of_experience: years_of_experience,
            })
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


