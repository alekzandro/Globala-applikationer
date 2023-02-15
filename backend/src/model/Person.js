const {Model ,DataTypes} = require('sequelize');

class Person extends Model {
    
    static get MODEL_NAME(){
        return 'persons';
    }

    static get ATTRIBUTES(){
        return ['person_id','name','surname','pnr','email','password','role_id','username'];
    }
    
    static createModel (sequelize){
        Person.init(
            {
                person_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: DataTypes.STRING
                },
                surname: {
                    type: DataTypes.STRING
                },
                pnr: {
                    type: DataTypes.STRING
                },
                email: {
                    type: DataTypes.STRING
                },
                password: {
                    type: DataTypes.STRING
                },
                role_id: {
                    type: DataTypes.INTEGER,
                    defaultValue: null
                },
                username: {
                    type: DataTypes.STRING
                }
            },
            {sequelize, modelName: Person.MODEL_NAME, paranoid: false }
        );
        return Person;
    }
}

module.exports = Person;