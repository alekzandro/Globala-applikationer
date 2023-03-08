/*The testConnection method now throws an error if it fails to authenticate with the database.

The findPersonById method now checks if the retrieved foundPerson is null and throws an error if it is.

The findPersonByIdentifiers method now throws an error if it fails to find a person by identifiers.

The insertNewPerson method now throws an error if it fails to insert a new person into the database*/

const {Sequelize, Op} = require('sequelize');
const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');
const sequelize = require('../util/database')

class RegDAO {
/*

    Test the connection to the database and throw an error if the connection fails
    @throws {Error} Failed to connect to database
    */
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
/**

    Find a person by their ID
    @param {number} person_id - The ID of the person to find
    @throws {Error} If the retrieved foundPerson is null
    @returns {PersonDTO} The person found as a PersonDTO object
    */
    async findPersonById (person_id) {
        try {
            const foundPerson = await Person.findByPk(person_id);
            if (foundPerson.length === 0) return null;
            return this.createPersonDTO(foundPerson);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
/**

    Find a person by their username, email, or personal number
    @param {string} [username=null] - The username of the person to find
    @param {string} [email=null] - The email of the person to find
    @param {string} [pnr=null] - The personal number of the person to find
    @throws {Error} If it fails to find a person by identifiers
    @returns {PersonDTO} The person found as a PersonDTO object
    */
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
            console.error(error);
            throw error;
        }
    }
/**

    Insert a new person into the database
    @param {string} username - The username of the person
    @param {string} email - The email of the person
    @param {string} pnr - The personal number of the person
    @param {string} password - The password of the person
    @param {string} name - The name of the person
    @param {string} surname - The surname of the person
    @throws {Error} If it fails to insert a new person into the database
    */
    async insertNewPerson(username, email, pnr, password, name, surname){
        try {
            const newPerson = await Person.create({
                name: name,
                surname: surname,
                pnr: pnr,
                email: email,
                password: password,
                role_id: 2,
                username: username,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
/**

    Creates a PersonDTO object based on a Person model object.
    @param {Object} personModel - The Person model object.
    @returns {Object} A PersonDTO object.
    */
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


