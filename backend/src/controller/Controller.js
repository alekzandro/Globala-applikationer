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

module.exports = {Controller};