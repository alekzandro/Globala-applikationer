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
            res.render('create_application', {navbardata:gen_navdata(req), start_date: dateformat(), path:"/createApplication", comps: comps, msg: "wow"})
        } else {
            res.render('homepage', {navdata:gen_navdata(req)})
        }
    }
    catch (error) {
        next(error);
    }
})

router.route('/').post(async (req, res, next) => {
    try {
        if (req.auth && req.auth.role_id === 2){
            const comps =  await controller.get_competencies();
            const result = await controller.updateApplication(req.auth.person_id, req.body.availabilities, req.body.competencies)
            console.log(result)
            console.log(result.msg)
            let msg = "Update";
            res.json(result);
        }
        else {
            res.render('homepage', {navdata:gen_navdata(req)})
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;