
// main.js
const sql = require('../../db');
const nodemailer = require('nodemailer');




// setup mail transporter service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chumunza@gmail.com', // your email
    pass: '11151996ju_ku'              // your password
  }
});

const getSubJectById = (id) => {
  console.log('id', id);
  return new Promise(function (resolve, reject) {
    const sqlQuery = `SELECT id, subject,text FROM therunway_internship.mailtemps WHERE id='${id}'`;
    sql.query(sqlQuery, function (err, result) {
      if (err) {
        return reject(err)
      }
      return resolve(result[0].subject)
    })

  })
}
const getSubJectByText = (id) => {
  console.log('id', id);
  return new Promise(function (resolve, reject) {
    const sqlQuery = `SELECT id, subject,text FROM therunway_internship.mailtemps WHERE id='${id}'`;
    sql.query(sqlQuery, function (err, result) {
      if (err) {
        return reject(err)
      }
      return resolve(result[0].text)
    })

  })
}

// setup email data with unicode symbols
exports.sendMail = async (data) => {

  const subject = await getSubJectById(data.idTmp);
  const html = await getSubJectByText(data.idTmp);

const mailOptions = {
  from: 'chumunza@gmail.com',              // sender
  to: data.email,              // list of receivers
    subject: subject,            // Mail subject
    html: html
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



