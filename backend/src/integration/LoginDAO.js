
const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');

class LoginDAO {
  

    async findUser(id) {
        try {
            let foundUser = await Person.findAll({where : {username: id}})
            if(foundUser[0]){
                return this.createPersonDTO(foundUser[0]);
            }
            foundUser = await Person.findAll({where : {pnr: id}})
            if(foundUser[0]) {
                return this.createPersonDTO(foundUser[0])
            }
            return null;                     
        } catch (error){
            throw error;
        }
    }

    async hasPassword(user){
        if(user && user.password){
            return true;
        } else {
            return false;
        }
    }

    async checkPassword(user, password){
        if(user && user.password == password){
            return user;          
         } else {
            return null;
         }
    }

    async setPassword(pnr, password){
        return await Person.update({password: password}, {where: {pnr: pnr}})
       
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