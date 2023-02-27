const {RegDAO} = require('../integration/RegDAO')
const LoginDAO = require('../integration/LoginDAO')
const validator = require('../util/Validator')

class Controller {
    constructor () {
        this.regDAO = new RegDAO();
        this.loginDAO = new LoginDAO();
    }

    async loginUser(username, password){
       const user = await this.loginDAO.findUser(username)
       console.log(user)
       if(await this.loginDAO.hasPassword(user)){
        console.log("In here!")
        return await this.loginDAO.checkPassword(user, password)
       } else {
        return user;
       }
    }

    async setPassword(personnumber, password) {
        this.loginDAO.setPassword(personnumber, password)
    }

    async registerUser (username, password, pnr, email, name, surname){
        try {
            const validitystatus = validator.validateRegisterForm(username, password, pnr, email, name, surname);
            if (validitystatus.length > 0) return validitystatus.map(obj => obj.msg); 
            const res = await this.regDAO.findPersonByIdentifiers(username, email, pnr);
            if (res !== null) return false;
            await this.regDAO.insertNewPerson(username, email, pnr, password, name, surname)
            return null;
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