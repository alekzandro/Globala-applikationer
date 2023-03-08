const express = require('express');
const router = express.Router();
const db = require('../util/database')
const ApplicationDAO = require('../integration/applicationsDAO');
const {gen_navdata} = require('../util/helpers')
/**

    Route serving view of applications.
    @name get/view
    @function
    @memberof module:routes/application
    @param {Object} req - Express request object.
    @param {Object} res - Express response object.
    @param {function} next - Express next middleware function.
    @throws {Error} If there is an error while finding applications.
*/
router.get('/view', async (req, res, next) => {
  try {
    const nrOfApplications = req.query.nrOfApplications;
    navdata = gen_navdata(req)
    if(req.auth && req.auth.role_id === 1){
      const application = new ApplicationDAO(db)
      const applications = await application.findApplications(nrOfApplications);
      console.log(applications)
      res.render('listofapplications', { applications: applications })
    } else {
      res.render('homepage.ejs', navdata)
    }
  } catch (error) {
    next(error);
  }
});
/**

    Route serving application creation page.
    @name get/create
    @function
    @memberof module:routes/application
    @param {Object} req - Express request object.
    @param {Object} res - Express response object.
    */
router.get('/create', (req, res) => {
  navdata = gen_navdata(req)
  if(req.auth){
    res.send("Create application")
  }
})


module.exports = router;

/**
 we have a try-catch block in the /view route handler to catch any errors that may occur during 
 the execution of the code inside the try block. If an error is caught, we call the next function 
 with the error as an argument to pass the error to the next error handling middleware or route handler.

 */