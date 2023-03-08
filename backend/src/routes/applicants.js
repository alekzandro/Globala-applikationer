/**

    Express router to handle Applicant routes.
    @module routes/applicant
    */
const express = require("express")
/** Express router to mount Applicant related functions on. */
const router = express.Router()
/**

    Route serving homepage.
    @name get/
    @function
    @memberof module:routes/applicant
    @param {Object} req - Express request object.
    @param {Object} res - Express response object.
    @returns {string} - Returns "Applicant".
    */
router.get("/", (req, res) => {
    res.send("Applicant")
})
/**

    Route serving applicant login page.
    @name get/login_applicant
    @function
    @memberof module:routes/applicant
    @param {Object} req - Express request object.
    @param {Object} res - Express response object.
    @returns {string} - Returns "login".
    */
router.get("/login_applicant", (req, res) => {
    res.send("login")
})

module.exports = router