const express = require('express');
const router = express.Router();
const db = require('../util/database')
const ApplicationDAO = require('../integration/applicationsDAO');

router.get('/', (req, res) => {
  const nrOfApplications = req.query.nrOfApplications;

  console.log("HELLO " + nrOfApplications)

  const application = new ApplicationDAO(db)
  application.findApplications(nrOfApplications).then(applications => {
  console.log(applications)
    res.render('listofapplications', { applications: applications
      
    })
  })
});

module.exports = router;