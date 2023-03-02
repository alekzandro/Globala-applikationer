const express = require('express')
const {gen_navdata} = require('../util/helpers')
const router = express.Router()

router.get("/", (req, res) => {
    
    navdata = gen_navdata(req)
    res.render("homepage", navdata)
    
})




module.exports = router