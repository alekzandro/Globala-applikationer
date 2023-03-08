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

    async updateApplication (person_id, availablities, competencies){
        let status = {success: false, msg: 'failed to update application'}
        if (availablities.length === 0 && competencies.length === 0) return status;
        const transactor = new Transactor();
        try {
            await transactor.startTransaction();
            const existing_av = await this.appDAO.availabilitesByPersonId(person_id);
            const existing_comp = await this.appDAO.competencyByPersonId(person_id); 
            const comps = await this.get_competencies();

            availablities = availablities.filter(e => {
                let found = existing_av.find(x => {
                    return (e.from === x.from_date && e.to === x.to_date)
                })
                return found?false:true;
            })

            competencies = competencies.filter(e => {
                let found0 = comps.find(x =>{
                    return parseInt(e.competency.id) === x.id;
                })
                let found1 = existing_comp.find(x => {
                    return parseInt(e.competency.id) === x.competence_id
                })
                return (found0 !== undefined && found1 !== undefined)?false:true;
            })

            for(let i = 0; i < availablities.length; i++){
                let e = availablities[i];
                await this.appDAO.insertAvailability(person_id, e.from, e.to)
            }
            for(let i = 0; i < competencies.length; i++){
                let e = competencies[i];
                await this.appDAO.insertCompetency(person_id, e.competency.id, e.experience)
            }
            await transactor.commit();
            status.success = true;
            status.msg = 'application updated successfully'
        } catch (error) {
            await transactor.rollback();
            throw error;
        }
        finally {
            return status;
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