const cookieHandler = require('../cookieHandler')
const controller = require('../../controller/Controller')

// check if the client who request is comming from is logged in
// if user is logged in it sets req.auth to true else false
// It is important this middleware is used before any routers!
const authCheck = async (req, res, next) => {
    try {
        const user = await cookieHandler.checkAuth(controller, req, res);
        if (!user){
            //user not logged in
            req.auth = null;
        } else {
            //user is logged in 
            req.auth = user;
        }
    } catch (error) {
        next(error);
    }
    next();
}

module.exports = authCheck;