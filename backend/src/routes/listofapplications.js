const express = require('express');
const router = express.Router();

router.get('/list-of-applications', (req, res) => {
  res.render('listofapplications', {
    applicants: [
      { name: 'John Doe', application: 'Cover Letter', date: '01/01/2023' },
      { name: 'John Doe', application: 'Resume', date: '01/01/2023' },
      { name: 'Jane Smith', application: 'Cover Letter', date: '01/02/2023' },
      { name: 'Jane Smith', application: 'Resume', date: '01/02/2023' },
      { name: 'Jane Smith', application: 'Writing Sample', date: '01/02/2023' },
      { name: 'Bob Johnson', application: 'Cover Letter', date: '01/03/2023' },
      { name: 'Bob Johnson', application: 'Resume', date: '01/03/2023' }
    ]
  });
});

module.exports = router;