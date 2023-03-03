const express = require('express');
const router = express.Router();
const cookieHandler = require('../api/cookieHandler')
const controller = require('../controller/Controller');
const gen_navdata = require('../util/helpers');

router.route('/').get(async (req, res, next) => {
    if (req.auth){
        // User is already logged in ofcourse they should not be able to access register page
        navdata = gen_navdata(req)
        res.render("homepage", navdata); // render homepage
    }
    else {
        navbardata = gen_navdata(req)
        res.render("registration_page", {status: null, user: null, navbardata:navbardata, causes:null});
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
        const validitystatus = await controller.registerUser(body.username, body.password, body.pnr, body.email, body.name, body.surname);
        if (validitystatus){
            props={status: 'failed', user:body.username, causes: validitystatus}
        } else {
            props={status: 'was successfull', user:body.username, causes: null}
        }

        res.render("registration_page", props);
    } catch(err) {
        throw err;
    }
})

module.exports = router;
