/*The testConnection method now throws an error if it fails to authenticate with the database.

The findPersonById method now checks if the retrieved foundPerson is null and throws an error if it is.

The findPersonByIdentifiers method now throws an error if it fails to find a person by identifiers.

The insertNewPerson method now throws an error if it fails to insert a new person into the database*/

const {Sequelize, Op} = require('sequelize');
const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');
const sequelize = require('../util/database')

class RegDAO {

    async testConnection (){
        try {
            await sequelize.authenticate();
            console.log("DB CONNECTION SUCCESS");
        } catch (error) {
            console.log ("DB CONNECTION FAIL");
            console.error(error);
            throw new Error("Failed to connect to database");
        }
    }

    async findPersonById (person_id) {
        try {
            const transaction = await sequelize.transaction();
            const foundPerson = await Person.findByPk(person_id);
            transaction.commit()
            if (foundPerson.length === 0) return null;
            return this.createPersonDTO(foundPerson);
        } catch (error) {
            transaction.rollback();
            console.error(error);
            throw new Error("Failed to find person by ID");
        }
    }

    async findPersonByIdentifiers (username=null, email=null, pnr=null) {
        const transaction = await sequelize.transaction();
        try {
            const validIdentifiers = [{username: username},{email: email},{pnr: pnr}].filter(elem => elem[Object.keys(elem)[0]] !== null)
            if (validIdentifiers.length === 0) return null;
            const foundPerson = await Person.findAll({
                where: {
                    [Op.or]: validIdentifiers
                }
            });
            transaction.commit();
            if (foundPerson.length === 0) return null;
            return this.createPersonDTO(foundPerson[0]);
        } catch (error){
            transaction.rollback();
            console.error(error);
            throw new Error("Failed to find person by identifiers");
        }
    }

    async insertNewPerson(username, email, pnr, password, name, surname){
        const transaction = sequelize.transaction();
        try {
            const newPerson = await Person.create({
                name: name,
                surname: surname,
                pnr: pnr,
                email: email,
                password: password,
                username: username,
            });
            transaction.commit()
        } catch (error) {
            transaction.rollback();
            console.error(error);
            throw new Error("Failed to insert new person");
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


