
const Person = require('../model/Person');
const Competence = require('../model/Competence');
const Competence_profile = require('../model/Competence_profile');
const Availability = require('../model/Availability');
const ApplicationDTO = require('../model/ApplicationDTO');


class ApplicationDAO {


    async findApplications(nrOfApplications) {
        try {

            const result = await Person.findAll();
            const applications = []
            for(let i =0; i < nrOfApplications; i++){
                applications[i] = this.createApplicationDTO(result[i], "test", "test")
               
            }
            
            return applications


           
        } catch (error){
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