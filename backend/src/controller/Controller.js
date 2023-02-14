const {RegDAO} = require('../integration/RegDAO')

class Controller {
    constructor () {
        this.regDAO = new RegDAO();
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