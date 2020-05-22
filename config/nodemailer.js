const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: `smtp.gmail.com`,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const sendVerificationEmail = (to, key, done) => {
    const from = `"Guardian" <${process.env.GMAIL_USER}>`;
    const subject = `Verify your e-mail address`;

    const text = `Thank you for signing up on Guardian! 
        Please click http://${process.env.HOST}:${process.env.PORT}/users/verify/${key} to verify your e-mail address.`;

    const html = `<h2>Thank you for signing up on Guardian!</h2>
        </br>
        Please <a href="http://${process.env.HOST}:${process.env.PORT}/users/verify/${key}">verify your e-mail address</a> to continue.`;

    transporter.sendMail({ from, to, subject, text, html }, done);
};

module.exports = { transporter, sendVerificationEmail };