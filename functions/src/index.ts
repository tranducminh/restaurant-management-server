import * as functions from 'firebase-functions';
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', //your email
    pass: '' //your password
  }
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const {email, password, position} = req.query;

    const mailOptions = {
      from: 'Restaurant management', // Something like: Jane Doe <janedoe@gmail.com>
      to: email,
      subject: 'New account', // email subject
      html: `<b>Email: ${email}</b></br>
            <b>Password: ${password}</b></br>
            <b>Position: ${position}</b></br>
          ` 
    };

    // returning result
    return transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        return res.send(error.toString());
      }
      return res.json({
        message: 'Sent successfully'
      });
    });
  });
});
