
const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');
const sequelize = require("../util/database");

class LoginDAO {
  

    async findUser(id) {

        const transaction = await sequelize.transaction();

        try {
            let foundUser = await Person.findAll({where : {username: id}})
            if(foundUser[0]){
                transaction.commit();
                return this.createPersonDTO(foundUser[0]);
            }
            foundUser = await Person.findAll({where : {pnr: id}})
            if(foundUser[0]) {
                transaction.commit();
                return this.createPersonDTO(foundUser[0])
            }
            transaction.commit();
            return null;                     
        } catch (error){
            await transaction.rollback();
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

    async findUserByEmail(email){
        const transaction = await sequelize.transaction();
        try {
            let foundUser = await Person.findAll({where : {email: email}})
            if(foundUser[0]){
                transaction.commit();
                return this.createPersonDTO(foundUser[0])
            } else {
                transaction.commit();
                return null
            }
        } catch(error){
            await transaction.rollback();
            throw error;

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
        const transaction = await sequelize.transaction();
        try {
            const update = await Person.update({password: password}, {where: {pnr: pnr}})
            transaction.commit();
            return update;

        } catch(error){
            await transaction.rollback();
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