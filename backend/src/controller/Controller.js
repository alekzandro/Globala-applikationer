const {RegDAO} = require('../integration/RegDAO')
const LoginDAO = require('../integration/LoginDAO')

const ApplicationDAO = require('../integration/applicationsDAO');
const validator = require('../util/Validator')
const passwordGenerator = require('../util/PasswordGenerator')
const emailSender = require('../util/EmailSender');
const Transactor = require('../integration/Transactor');

class Controller {
    constructor () {
        this.regDAO = new RegDAO();
        this.loginDAO = new LoginDAO();
        this.appDAO = new ApplicationDAO();
    }

    async loginUser(username, password){
       const user = await this.loginDAO.findUser(username)
      
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

    async findUserByEmail(email){
        return await this.loginDAO.findUserByEmail(email)
    }

    async sendPasswordEmail(password, recipient){
        emailSender.sendPasswordEmail(password, recipient)
    }


    async registerUser (username, password, pnr, email, name, surname){
        const transactor = new Transactor(); // creating transactor interface
        
        try {   
            await transactor.startTransaction();  // start transaction
            try {
                const res = await this.regDAO.findPersonByIdentifiers(username, email, pnr);
                if (res !== null) {
                    await transactor.commit(); // commit if user already exists and return
                    return false;
                }
                await this.regDAO.insertNewPerson(username, email, pnr, password, name, surname)  
                transactor.commit(); // commit inserted user
            } catch (error) {
                transactor.rollback(); // rollback if transaction fails
                throw error; // throwing error so it propagates up to error handlers.
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    async generatePassword(){
        return passwordGenerator.generatePassword();
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

    async get_competencies (){
        try {
            return await this.appDAO.getCompetencies();
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