const express = require('express');
const router = express.Router();
const cookieHandler = require('../api/cookieHandler')
const controller = require('../controller/Controller')

router.route('/register_view').get((req, res, next) => {
    controller.testDatabaseConnection();
    if (req.auth){
        // User is already logged in ofcourse they should not be able to access register page
        res.render("homepage"); // render homepage
    }
    else {
        // if user is logged out they can access registration page
        res.status(200);
        res.render("registration_page", {status: null, user: null});
    }
})

/**
 * When a client registers with a username and password
 * if register successfull view is rerendered with a success message else fail message
 */
router.route('/register_view').post(async (req, res, next) => {
    try{
        const body = req.body;
        console.log(body)
        const registerStatus = await controller.registerUser(body.username, body.password, body.pnr, body.email, body.name, body.surname);
        console.log(`found user:\n${registerStatus}`)
       // cookieHandler.sendAuthCookie(username, res); // testing cookies
        res.render("registration_page", {status:'successfull', user:body.username}) 
    } catch(err) {

    }// if registration is successfull 
})

module.exports = router;
