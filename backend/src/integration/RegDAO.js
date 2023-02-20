const {Sequelize, Op} = require('sequelize');
const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');
const sequalize_instance = require('../util/database')

class RegDAO {


    async testConnection (){
        try {
            await this.database.authenticate();
            console.log("DB CONNECTION SUCCESS");
        } catch (error) {
            console.log ("DB CONNECTION FAIL");
        }
    }

    async findPersonByIdentifiers (username=null, email=null, pnr=null) {
        try {
            const validIdentifiers = [{username: username},{email: email},{pnr: pnr}].filter(elem => elem[Object.keys(elem)[0]] !== null)
            if (validIdentifiers.length === 0) return null;
            const foundPerson = await Person.findAll({
                where: {
                    [Op.or]: validIdentifiers
                }
            });
            if (foundPerson.length === 0) return null;
            return this.createPersonDTO(foundPerson[0]);
        } catch (error){
            throw error;
        }
    }

    async insertNewPerson(username, email, pnr, password, name, surname){
        try {
            const newPerson = await Person.create({
                name: name,
                surname: surname,
                pnr: pnr,
                email: email,
                password: password,
                username: username,
            });
        } catch (error) {
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

module.exports = {RegDAO}


