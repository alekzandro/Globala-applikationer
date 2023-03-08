/**

    Express router to handle create application routes.
    @module routes/create_application
    */
const express = require('express');
const controller = require('../controller/Controller');
const router = express.Router();
const {gen_navdata, dateformat} = require('../util/helpers')

router.route('/').get(async (req, res, next) => {
    try{
        if(req.auth && req.auth.role_id === 2){
            const comps =  await controller.get_competencies();
            console.log(comps);
            res.header('Access-Control-Allow-Origin', '*')
            res.render('create_application', {navbardata:gen_navdata(req), start_date: dateformat(), path:"/createApplication", comps: comps})
        } else {
            res.render('homepage', {navdata:gen_navdata(req)})
        }
    }
    catch (error) {
        next(error);
    }
})
/**

    Route serving create application page.
    @name get/
    @function
    @memberof module:routes/create_application
    @param {Object} req - Express request object.
    @param {Object} res - Express response object.
    @param {function} next - Express next middleware function.
    @throws {Error} If there is an error while getting competencies.
    */
router.route('/').post(async (req, res, next) => {
    console.log("post createapp call")
    console.log(req.body);
    res.send({msg: "received"})
})

module.exports = router;