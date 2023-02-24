const express = require('express');
const router = express.Router();
const cookieHandler = require('../api/cookieHandler')
const controller = require('../controller/Controller')

router.route('/').get(async (req, res, next) => {
    if (req.auth){
        // User is already logged in ofcourse they should not be able to access register page
        navdata = {loginstatus:true, username: req.auth.username}
        res.render("homepage", navdata); // render homepage
    }
    else {
        navbardata = {loginstatus:false, username:null}
        res.render("registration_page", {status: null, user: null, navbardata:navbardata});
    }
})

/**
 * When a client registers with a credentials
 * if register successfull view is rerendered with a success message else fail message
 */
router.route('/').post(async (req, res, next) => {
    const getProps = (status, user) => {
        return {status: status, user: user};
    }

    try{
        const body = req.body;
        const registerSuccess = await controller.registerUser(body.username, body.password, body.pnr, body.email, body.name, body.surname);
        const props = registerSuccess?getProps('was successfull', body.username):getProps('failed', body.username);
        res.render("registration_page", props);
    } catch(err) {
        throw err;
    }
})

module.exports = router;
