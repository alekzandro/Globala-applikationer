const express = require('express')
const router = express.Router()
const loginDAO = require('../integration/LoginDAO')
const db = require('../util/database')
const cookieHandler = require('../api/cookieHandler')
const gen_navdata = require('../util/helpers')


router.get("/", (req, res) => {
    navdata = gen_navdata(req)
    if (req.auth){
        res.render("homepage.ejs", navdata) // redirect to homepage if already logged in
    }
    else {
    res.render("login.ejs", navdata)
    }
})

router.post("/", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const login = new loginDAO(db);
   login.checkPassword(username, password).then(user => {
        cookieHandler.sendAuthCookie(user, res)
        res.render("user_start_page", {user: user})
    })
})





module.exports = router