const express = require('express');
const router = express.Router();
const cookieHandler = require('../api/cookieHandler')

router.route('/register_view').get((req, res, next) => {
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
router.route('/register_view').post((req, res, next) => {
    const body = req.body;
    const username = body.username;
    cookieHandler.sendAuthCookie(username, res); // testing cookies
    res.render("registration_page", {status:'successfull', user:username}) // if registration is successfull 
})

module.exports = router;
