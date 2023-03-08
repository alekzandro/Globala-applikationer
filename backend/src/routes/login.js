/* In the post('/') and post('/getpassword') routes, we have wrapped the code inside a try-catch block 
to catch any errors that may occur. If an error occurs, the code inside the catch block will execute, 
and the server will respond with a 500 status code and an error message.
*/
const express = require('express')
const router = express.Router()
const loginDAO = require('../integration/LoginDAO')
const db = require('../util/database')
const cookieHandler = require('../api/cookieHandler')
const {gen_navdata} = require('../util/helpers')
const controller = require('../controller/Controller')
const validator = require('../util/Validator')
/**
 * Render the login page if the user is not authenticated, otherwise redirect to homepage.
 *
 * @name get/login
 * @function
 * @memberof module:routers/LoginRouter
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {undefined}
 */

router.get("/", (req, res) => {
    navdata = gen_navdata(req)
    if (req.auth){
        res.render("homepage.ejs", navdata) // redirect to homepage if already logged in
    }
    else {
    res.render("login.ejs", {navdata: navdata, incorrect: false})
    }
})
/**
 * Handle the login request and render the homepage if the login is successful.
 * If the login fails, the login page is rendered with an error message.
 * If an error occurs, the server will respond with a 500 status code and an error message.
 *
 * @name post/login
 * @function
 * @memberof module:routers/LoginRouter
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {undefined}
 */
router.post("/", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await controller.loginUser(username, password)

    if(user && user.password){
        cookieHandler.sendAuthCookie(user, res)
        navdata = {loginstatus:true, username: user.name, recruiter: user.role_id==1}
       
        res.render("homepage.ejs", {navdata: navdata, incorrect: true})
    } else if (user){
        navdata = gen_navdata(req)
        res.render("getpassword", {user_pnr: user.pnr, incorrectEmail: false, navdata: navdata})
    } else {
        navdata = gen_navdata(req)
        res.render("login.ejs", {navdata: navdata, incorrect: true})
    }
} catch (error) {
    console.log("Error occurred in post('/'): ", error)
    res.status(500).send("Error occurred while trying to log in. Please try again later.")    
  }
})

/**
 * Handle the password reset request.
 * If the email provided is valid, a new password is generated and sent to the user via email.
 * If the email provided is invalid, the getpassword page is rendered with an error message.
 * If an error occurs, the server will respond with a 500 status code and an error message.
 *
 * @name post/login/getpassword
 * @function
 * @memberof module:routers/LoginRouter
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {undefined}
 */
router.post('/getpassword',async (req, res) => {
    try {
    navdata = gen_navdata(req)
    const email = req.body.email
    var user = await controller.findUserByEmail(email)

    if(user){
       var password = await controller.generatePassword();
       //controller.sendPasswordEmail(user.email, password)
       console.log("Sending email with password")
        controller.setPassword(user.pnr, password)
        res.redirect('/login')
    } else {
        res.render("getpassword", {user_pnr: req.body.pnr, incorrectEmail: true, navdata: navdata})
    }
    } catch (error) {
    console.log("Error occurred in post('/getpassword'): ", error)
    res.status(500).send("Error occurred while trying to retrieve password. Please try again later.")
    }
});


module.exports = router