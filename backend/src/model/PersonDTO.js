
class PersonDTO {
    constructor (id, name, surname, pnr, email, password, roleID, username){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.pnr = pnr;
        this.email = email;
        this.password = password;
        this.roleID = roleID;
        this.username = username;
    }
}

module.exports = PersonDTO