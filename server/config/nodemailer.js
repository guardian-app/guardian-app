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

const sendVerificationEmail = (to, key) => {
    const from = `"Guardian" <${process.env.GMAIL_USER}>`;
    const subject = `Verify your e-mail address`;

    const text = `Thank you for signing up on Guardian! 
        Please click http://${process.env.HOST}:${process.env.PORT}/users/verify/${key} to verify your e-mail address.`;

    const html = `<h2>Thank you for signing up on Guardian!</h2>
        </br>
        Please <a href="http://${process.env.HOST}:${process.env.PORT}/users/verify/${key}">verify your e-mail address</a> to continue.`;

    return transporter.sendMail({ from, to, subject, text, html });
};

const sendPasswordResetEmail = (to, key) => {
    const from = `"Guardian" <${process.env.GMAIL_USER}>`;
    const subject = `Reset your password`;

    const text =
        `Reset your Guardian password 
        Please use the code ${key} to reset your password.`;

    const html =
        `<h2>Reset your Guardian password</h2>
        </br>
        Please use the code <code>${key}</code> to reset your password.`;

    return transporter.sendMail({ from, to, subject, text, html });
};

module.exports = { transporter, sendVerificationEmail, sendPasswordResetEmail };