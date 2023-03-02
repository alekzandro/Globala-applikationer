const express = require('express');
const router = express.Router();
const db = require('../util/database')
const ApplicationDAO = require('../integration/applicationsDAO');
const {gen_navdata} = require('../util/helpers')

router.get('/', (req, res) => {
  const nrOfApplications = req.query.nrOfApplications;
  navdata = gen_navdata(req)
  if(req.auth){
    const application = new ApplicationDAO(db)
    application.findApplications(nrOfApplications).then(applications => {
    console.log(applications)
      res.render('listofapplications', { applications: applications })
    })
  } else {
    res.render('homepage.ejs', navdata)
  }
});


module.exports = router;