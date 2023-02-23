const express = require('express')
const router = express.Router()
const loginDAO = require('../integration/LoginDAO')
const db = require('../util/database')
const cookieHandler = require('../api/cookieHandler')


router.get("/", (req, res) => {
    
    res.render("login.ejs")
    
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