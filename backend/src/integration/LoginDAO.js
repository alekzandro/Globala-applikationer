/**

    Represents a data access object for handling user authentication and login functionality.
    */
const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');
const sequelize = require("../util/database");

class LoginDAO {
  
/**

    Finds a user by ID and returns a PersonDTO object for that user.
    @param {number} id - The ID of the user to find.
    @returns {Promise<PersonDTO|null>} - A promise that resolves to a PersonDTO object for the user with the given ID, or null if no user is found.
    @throws {Error} - If there was an error while finding the user.
    */
    async findUser(id) {

        const transaction = await sequelize.transaction();

        try {
            let foundUser = await Person.findAll({where : {username: id}})
            if(foundUser[0]){
                transaction.commit();
                return this.createPersonDTO(foundUser[0]);
            }
            foundUser = await Person.findAll({where : {pnr: id}})
            if(foundUser[0]) {
                transaction.commit();
                return this.createPersonDTO(foundUser[0])
            }
            transaction.commit();
            return null;                     
        } catch (error){
            await transaction.rollback();
            console.error('Error occurred while finding user: ', error);
            throw error;
        }
    }
    /**

    Returns true if the given user has a password, otherwise false.
    @param {Object} user - The user object to check for a password.
    @returns {Promise<boolean>} - A promise that resolves to true if the user has a password, otherwise false.
    */
    async hasPassword(user){
        if(user && user.password){
            return true;
        } else {
            return false;
        }
    }
    /**

    Finds a user by email and returns a PersonDTO object for that user.
    @param {string} email - The email address of the user to find.
    @returns {Promise<PersonDTO|null>} - A promise that resolves to a PersonDTO object for the user with the given email, or null if no user is found.
    @throws {Error} - If there was an error while finding the user.
    */
    async findUserByEmail(email){
        const transaction = await sequelize.transaction();
        try {
            let foundUser = await Person.findAll({where : {email: email}})
            if(foundUser[0]){
                transaction.commit();
                return this.createPersonDTO(foundUser[0])
            } else {
                transaction.commit();
                return null
            }
        } catch(error){
            await transaction.rollback();
            console.error('Error occurred while finding user by email: ', error);
            throw error;

        }
       
    }
    /**

    Checks if the given password matches the user's password.
    @param {Object} user - The user object to check the password for.
    @param {string} password - The password to check.
    @returns {Promise<Object|null>} - A promise that resolves to the user object if the password matches, otherwise null.
    */
    async checkPassword(user, password){
        if(user && user.password == password){
            return user;          
         } else {
            return null;
         }
    }
/**

    Sets the password for a user with the specified personal number.
    @async
    @function
    @param {string} pnr - The personal number of the user whose password is being set.
    @param {string} password - The new password for the user.
    @returns {Promise<number>} - The number of affected rows.
    @throws {Error} - Throws an error if an error occurs while setting the password.
    */
    async setPassword(pnr, password){
        const transaction = await sequelize.transaction();
        try {
            const update = await Person.update({password: password}, {where: {pnr: pnr}})
            transaction.commit();
            return update;

        } catch(error){
            await transaction.rollback();
            console.error('Error occurred while setting password: ', error);
            throw error;
        }       
    }

/**

    Creates a PersonDTO object from a Person model object.
    @function
    @param {Object} personModel - The Person model object.
    @returns {PersonDTO} - The PersonDTO object.
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

module.exports = LoginDAO