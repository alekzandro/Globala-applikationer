const express = require('express');
const router = express.Router();
const {gen_navdata, dateformat} = require('../util/helpers')

const hardcoded_comps = [{id:1, name:"ticket sales"},
{id: 2, name:"lotteries"}, {id: 3, name:"rollercoaster operation"}];

router.route('/').get(async (req, res, next) => {
    if(req.auth && req.auth.role_id === 2){
        res.header('Access-Control-Allow-Origin', '*')
        res.render('create_application', {navbardata:gen_navdata(req), start_date: dateformat(), path:"/createApplication", comps: hardcoded_comps})
    } else {
        res.render('homepage', {navdata:gen_navdata(req)})
    }
})

router.route('/').post(async (req, res, next) => {
    console.log("post createapp call")
    console.log(req.body);
    res.send({msg: "received"})
})

module.exports = router;