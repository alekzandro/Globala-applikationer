const express = require('express');
const router = express.Router();
const cookieHandler = require('../api/cookieHandler')



router.route('/').get(async (req, res) => {
    try {
        if (req.auth){
            await cookieHandler.clearAuth(req, res);
        } 
        res.render('homepage', {navdata:{loginstatus:false, username: null, recruiter: null}});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;

/*
We have a try-catch block to handle any errors that might occur during the execution of the code. 
If an error occurs, it will be logged to the console and a 500 Internal Server Error response will be sent back to the client.
*/ 