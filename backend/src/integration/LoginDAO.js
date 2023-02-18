const {Sequelize, Op} = require('sequelize');
const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');

class LoginDAO {
    constructor (db) {
        Person.createModel(db);
    }



    async checkPassword(username, password) {
        try {
            const foundPerson = await Person.findAll({where : {username: username}})
           return foundPerson[0].username == username && foundPerson[0].password == password;           
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