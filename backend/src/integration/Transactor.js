const sequelize = require('../util/database');

/**
 * A class representing a transaction.
 * Useful for executing multiple SQL statements in a single transaction.
 */
class Transactor {
    #manager;
    #transaction;
/**
     * Creates a new instance of the Transactor class.
     */
    constructor(){
    /**
      * The sequelize manager.
      * @type {Sequelize}
      * @private
      */
        this.#manager = sequelize;
    }
/**

    Begins a new transaction
    @async
    @function startTransaction
    @throws {Error} If transaction manager fails to start a new transaction
    */
    async startTransaction (){
        try {
            this.#transaction = await this.#manager.transaction();
        } catch (error) {
            throw error;
        }
    }
/**

    Commits the current transaction
    @async
    @function commit
    @throws {Error} If no transaction has been started or if the commit fails
    */
    async commit (){
        if (!this.#transaction) throw Error('No transaction started');
        try {
            await this.#transaction.commit();
        } catch (error) {
            throw error;
        }
    }
/**

    Rolls back the current transaction
    @async
    @function rollback
    @throws {Error} If no transaction has been started or if the rollback fails
    */
    async rollback (){
        if(!this.#transaction) throw Error('No transaction started');
        try {
            await this.#transaction.rollback();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Transactor;