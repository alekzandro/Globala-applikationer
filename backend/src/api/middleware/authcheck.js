const cookieHandler = require('../cookieHandler')
const controller = require('../../controller/Controller')

/**

    Middleware that checks if the client who requested is logged in.
    If the user is logged in, it sets req.auth to true else false.
    It is important that this middleware is used before any routers!
    @async
    @function
    @param {Object} req - Express request object
    @param {Object} res - Express response object
    @param {Function} next - Express next function
    @throws {Error} Throws an error if there's an error while checking authentication
    @returns {void}
    */
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