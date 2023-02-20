const {RegDAO} = require('../integration/RegDAO')
const validator = require('../util/Validator')

class Controller {
    constructor () {
        this.regDAO = new RegDAO();
    }

    async registerUser (username, password, pnr, email, name, surname){
        try {
            if (!validator.validateRegisterForm(username, password, pnr, email, name, surname)) return false; 
            const res = await this.regDAO.findPersonByIdentifiers(username, email, pnr);
            if (res !== null) return false;
            await this.regDAO.insertNewPerson(username, password, pnr, email, name, surname)
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getUserById (person_id){
        try {
            return await this.regDAO.findPersonById(person_id);
        } catch (error) {
            throw error;
        }
    } 

    async testDatabaseConnection (){
        try {
            await this.regDAO.testConnection();
        } catch (error) {
            throw error;
        }
    }
}

// Creating a controller singleton and freezing the object 
// to not allow changes to its properties.
const controller = new Controller();
Object.freeze(controller);

// exporting singleton instance, not class
module.exports = controller;