const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Applicant")
})

router.get("/login_applicant", (req, res) => {
    res.send("login")
})

module.exports = router