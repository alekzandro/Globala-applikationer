
const Person = require('../model/Person');
const Competence = require('../model/Competence');
const Competence_profile = require('../model/Competence_profile');

const Availability = require('../model/Availability');
const ApplicationDTO = require('../model/ApplicationDTO');
const competenceDTO = require('../model/competenceDTO');


class ApplicationDAO {


    async findApplications(nrOfApplications) {
        try {

        
           
            const result = await Person.findAll();
            console.log(result[0])
            const applications = []
            for(let i =0; i < nrOfApplications; i++){
                applications[i] = this.createApplicationDTO(result[i], "test", "test")
               
            }
            
            return applications


           
        } catch (error){
            throw error;
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

module.exports = ApplicationDAO