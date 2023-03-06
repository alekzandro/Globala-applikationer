var emailer = require('nodemailer')
require('dotenv').config();

function sendPasswordEmail(password, recipient){
    var transporter = emailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: recipient,
        subject: 'Your new password',
        text: 'Here is your new password: ' + password,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = sendPasswordEmail

