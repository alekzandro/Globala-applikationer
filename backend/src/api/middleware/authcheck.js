const cookieHandler = require('../cookieHandler')

// check if the client who request is comming from is logged in
// if user is logged in it sets req.auth to true else false
// It is important this middleware is used before any routers!
const authCheck = async (req, res, next) => {
    try {
        const user = cookieHandler.checkAuth(null, req, res);
        if (!user){
            //user not logged in
            req.auth = false;
            console.log("user not logged in")
        } else {
            //user is logged in
            req.auth = true;
            console.log("user is logged in")
        }
    } catch (error) {
        next(error);
    } finally {
        next();
    }
}

module.exports = authCheck;