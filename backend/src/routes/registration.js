const express = require('express');
const router = express.Router();

router.route('/register_view').get((req, res, next) => {
    res.status(200);
    res.render("registration_page", {status: null, user: null});
})

/**
 * When a client registers with a username and password
 * if register successfull view is rerendered with a success message else fail message
 */
router.route('/register_view').post((req, res, next) => {
    const body = req.body;
    const username = body.username;
    res.render("registration_page", {status:'successfull', user:username}) // if registration is successfull 
})

module.exports = router;
