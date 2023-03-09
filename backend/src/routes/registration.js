/* We have added a try-catch block to handle any errors that may occur in the code. 
In the event of an error, the next function is called with the err argument, 
which will trigger the error handler middleware that we have it at the end of the code. 
The error handler simply logs the error to the console and sends a 500 status code with the message "Something broke!" to the client.
*/ 
const express = require('express');
const router = express.Router();
const cookieHandler = require('../api/cookieHandler')
const controller = require('../controller/Controller');
const {gen_navdata} = require('../util/helpers');
const validator = require('../util/Validator');

router.route('/').get(async (req, res, next) => {
    try {
    if (req.auth){
        // User is already logged in ofcourse they should not be able to access register page
        navdata = gen_navdata(req)
        res.render("homepage", navdata); // render homepage
    }
    else {
        navbardata = gen_navdata(req)
        res.render("registration_page", {status: null, user: null, navbardata:navbardata, causes:null});
    }
 } catch (err) {
    next(err);
 }
});

/**
 * When a client registers with a credentials
 * if register successfull view is rerendered with a success message else fail message
 */
router.route('/').post(async (req, res, next) => {
    try {
    const body = req.body;
    const validitystatus = validator.validateRegisterForm(
        body.username,
        body.password,
        body.pnr,
        body.email,
        body.name,
        body.surname
    );

    if (validitystatus.length > 0) {
        res.render('registration_page', { status: 'failed', user: body.username, causes: validitystatus.map(obj => obj.msg) });
        return;
    } 

        await controller.registerUser(
            body.username,
            body.password,
            body.pnr,
            body.email,
            body.name,
            body.surname
        );
        res.render('registration_page', { status: 'was successful', user: body.username, causes: null });
    } catch (err) {
        next(err);
    }
});

// Error handler
router.use(function (err, req, res, next) {
    console.error(err.stack);
    const error = {status: 500}
    next(error);
});

module.exports = router;
