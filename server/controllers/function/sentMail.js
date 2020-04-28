
// main.js


const nodemailer = require('nodemailer');




// setup mail transporter service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chumunza@gmail.com', // your email
    pass: '11151996ju_ku'              // your password
  }
});

// setup email data with unicode symbols
exports.sendMail= ( email ) => {
const mailOptions = {
  from: 'chumunza@gmail.com',              // sender
  to: email,              // list of receivers
  subject: 'Application Reply',            // Mail subject
  html: 'Thank you for your regist we will get back to you soon.' // HTML body
};
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


// send mail with defined transport object



