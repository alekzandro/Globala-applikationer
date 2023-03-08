const {RegDAO} = require('../integration/RegDAO')
const LoginDAO = require('../integration/LoginDAO')

const ApplicationDAO = require('../integration/applicationsDAO');
const validator = require('../util/Validator')
const passwordGenerator = require('../util/PasswordGenerator')
const emailSender = require('../util/EmailSender');
const Transactor = require('../integration/Transactor');
/**

    Controller class for handling user authentication and registration.

    @class
    */
class Controller {
    /*

    Constructs a new instance of Controller.
    @constructor
    */
    constructor () {
        this.regDAO = new RegDAO();
        this.loginDAO = new LoginDAO();
        this.appDAO = new ApplicationDAO();
    }
/**

    Authenticates user login credentials.

    @async

    @param {string} username - User's login username.

    @param {string} password - User's login password.

    @returns {Promise<Object>} - Returns user object if credentials are correct, otherwise null.
    */
    async loginUser(username, password){
       const user = await this.loginDAO.findUser(username)
      
       if(await this.loginDAO.hasPassword(user)){
        console.log("In here!")
        return await this.loginDAO.checkPassword(user, password)
       } else {
        return user;
       }
    }
/**

    Sets a user's login password.
    @async
    @param {string} personnumber - User's personal number.
    @param {string} password - User's new login password.
    */
    async setPassword(personnumber, password) {
        this.loginDAO.setPassword(personnumber, password)
    }
/**

    Finds user by their email address.
    @async
    @param {string} email - User's email address.
    @returns {Promise<Object>} - Returns user object.
    */
    async findUserByEmail(email){
        return await this.loginDAO.findUserByEmail(email)
    }
/**

    Sends a password reset email to user.
    @async
    @param {string} password - New password to be sent in email.
    @param {string} recipient - Email address to send password reset email to.
    */
    async sendPasswordEmail(password, recipient){
        emailSender.sendPasswordEmail(password, recipient)
    }
/**

    Registers a new user.

    @async

    @param {string} username - New user's login username.

    @param {string} password - New user's login password.

    @param {string} pnr - New user's personal number.

    @param {string} email - New user's email address.

    @param {string} name - New user's first name.

    @param {string} surname - New user's last name.

    @returns {Promise<Boolean>} - Returns false if user already exists, otherwise null.
    */

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
/**

    Generates a new random password.
    @async
    @returns {Promise<string>} - Returns a newly generated password.
    */
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

/**
    Creates a singleton instance of the Controller class and freezes it to not allow changes to its properties.
    @type {Controller} - The singleton instance of the Controller class.
    */
const controller = new Controller();
Object.freeze(controller);

/**

    Exporting the singleton instance of the Controller class, not the class itself.
    @module
    */
module.exports = controller;