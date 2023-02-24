
const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');

class LoginDAO {
  

    async checkPassword(username, password) {
        try {
            const foundPerson = await Person.findAll({where : {username: username}})
            if(!foundPerson[0]){
                foundPerson = await Person.findAll({where : {pnr: username}})
            }
            if(foundPerson[0].password == password) {
                return foundPerson[0]
            } else {
                return null
            }
                     
        } catch (error){
            throw error;
        }
    }

    createPersonDTO(personModel) {
        return new PersonDTO(
            personModel.person_id,
            personModel.name,
            personModel.surname,
            personModel.pnr,
            personModel.email,
            personModel.password,
            personModel.role_id,
            personModel.username
        );
    }
}

module.exports = LoginDAO