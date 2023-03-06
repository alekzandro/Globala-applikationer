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

router.route('/').post(async (req, res, next) => {
    console.log("post createapp call")
    console.log(req.body);
    console.log(req.body.competencies)
    res.send({msg: "received"})
})

module.exports = router;