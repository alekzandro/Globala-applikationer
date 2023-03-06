const express = require('express')
const gen_navdata = require('../util/helpers')
const router = express.Router()

router.get("/",async (req, res, next) => {
    try {
        navdata = gen_navdata(req);
        res.render('homepage', navdata);
      } catch (err) {
        next(err);
      }
});

router.use((req, res, next) => {
  res.status(404).render('404', { title: '404 - Not Found', navdata: gen_navdata(req) });
});


module.exports = router;

/** 
 * We have a function called "next" to handle any errors that 
 might happen while the homepage is being made.
This function will call the next middleware function in the chain 
and pass along the error, so that it can be handled by any middleware 
that can handle errors. This code will catch any request that doesn't match 
any of the routes defined in the router and render a custom 404 page. 
*/