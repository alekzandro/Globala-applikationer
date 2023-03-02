const express = require('express')
const router = express.Router()
const loginDAO = require('../integration/LoginDAO')
const db = require('../util/database')
const cookieHandler = require('../api/cookieHandler')
const {gen_navdata} = require('../util/helpers')
const controller = require('../controller/Controller')
const validator = require('../util/Validator')


router.get("/", (req, res) => {
    navdata = gen_navdata(req)
    if (req.auth){
        res.render("homepage.ejs", navdata) // redirect to homepage if already logged in
    }
    else {
    res.render("login.ejs", {navdata: navdata, incorrect: false})
    }
})

router.post("/", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = await controller.loginUser(username, password)

    if(user && user.password){
        cookieHandler.sendAuthCookie(user, res)
        navdata = {loginstatus:true, username: user.name, recruiter: user.role_id==1}
       
        res.render("homepage.ejs", {navdata: navdata, incorrect: true})
    } else if (user){
        navdata = gen_navdata(req)
        res.render("setpassword", {user_pnr: user.pnr, incorrectPassword: false, navdata: navdata})
    } else {
        navdata = gen_navdata(req)
        res.render("login.ejs", {navdata: navdata, incorrect: true})
    }
})


router.post('/setpassword', (req, res) => {
    navdata = gen_navdata(req)
    const validPassword = validator.isAlphaNumericSlash(req.body.password);
    if(validPassword){
        controller.setPassword(req.body.pnr, req.body.password)
        res.redirect('/login')
    } else {
        res.render("setpassword", {user_pnr: req.body.pnr, incorrectPassword: true, navdata: navdata})
    }

    
   
});


module.exports = router