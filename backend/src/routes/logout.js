const express = require('express');
const router = express.Router();
const cookieHandler = require('../api/cookieHandler')


router.route('/').get(async (req, res) => {
    navdata = {loginstatus:false, username: null}
    if (req.auth){
        try {
            await cookieHandler.clearAuth(req, res);
        } catch (error) {
            throw error;
        }
    } 
    res.render('homepage', navdata);
})

module.exports = router;