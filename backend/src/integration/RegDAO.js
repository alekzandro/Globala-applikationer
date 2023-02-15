const {Sequelize, Op} = require('sequelize');
const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');

class RegDAO {
    constructor () {
        this.database = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {host: process.env.DB_HOST, dialect: 'postgres',
            operatorAliases: false, define: {
                timestamps: false
            }}
        );
        Person.createModel(this.database);
    }

    async test_connection (){
        try {
            await this.database.authenticate();
            console.log("SUCESS");
        } catch (error) {
            console.log ("FAIL");
        }
    }

    async findPersonByIdentifiers (username=null, email=null, pnr=null) {
        try {
            const validIdentifiers = [{username: username},{email: email},{pnr: pnr}].filter(elem => elem[Object.keys(elem)[0]] !== null)
            const foundPerson = await Person.findAll({
                //attributes: Person.ATTRIBUTES,
                where: {
                    [Op.or]: validIdentifiers
                }
            });
            console.log("done, foundpers: ")
            console.log(foundPerson)
            if (foundPerson.length === 0) return null;
            console.log("done")
            return this.createPersonDTO(foundPerson[0]);
        } catch (error){
            throw error;
        }
    }

    async insertNewPerson(username, email, pnr, password, name, surname){
        try {
            const data = {
                person_id: "DEFAULT",
                name: name,
                surname: surname,
                pnr: pnr,
                email: email,
                password: password,
                username: username,
            }
            console.log(data)
            const newPerson = await Person.create({
                name: name,
                surname: surname,
                pnr: pnr,
                email: email,
                password: password,
                username: username,
            });
            console.log("past it")
            console.log(newPerson);
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


