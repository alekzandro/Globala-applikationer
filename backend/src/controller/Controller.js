const {RegDAO} = require('../integration/RegDAO')

class Controller {
    constructor () {
        this.regDAO = new RegDAO();
    }

    async registerUser (username, password, pnr, email, name, surname){
        try {
            if (username.length <= 0 || password.length < 6 || pnr.length < 0 || email.length < 6) return false; //Extremely basic validator
            const res = await this.regDAO.findPersonByIdentifiers(username, email, pnr);
            if (res !== null) return false;
            console.log ("insert start ctrl")
            await this.regDAO.insertNewPerson(username, password, pnr, email, name, surname)
            return true;
        } catch (error) {
            throw error;
        }
    }

    async testDatabaseConnection (){
        try {
            await this.regDAO.test_connection();
        } catch (error) {
            
        }
    }
}

// Creating a controller singleton and freezing the object 
// to not allow changes to its properties.
const controller = new Controller();
Object.freeze(controller);

// exporting singleton instance, not class
module.exports = controller;