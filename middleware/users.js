const jwt = require('jsonwebtoken');
const { selectUserByEmailAddress, selectUserById } = require('../services/users');
const { jwtSecret } = require('../config/jwt');

const checkDuplicateEmailAddress = (req, res, next) => {
    const { email_address } = req.body;

    selectUserByEmailAddress(email_address, (err, results, fields) => {
        if (err) throw err;
        if (results.length) return res.status(400).send('E-mail address is already registered!');
        next();
    });
}

const validateToken = (req, res, next) => {
    const { token } = req;
    if (!token) return res.status(403).send('Forbidden');

    jwt.verify(token, jwtSecret, (err, dec) => {
        if (err) return res.status(401).send('Unauthorized');

        selectUserById(dec.user_id, (err, results, fields) => {
            if (err) throw err;
            if (!results.length) return res.status(401).send('Unauthorized');

            const { user_id, email_address, first_name, last_name, address, phone_number } = results[0];
            req.user = { user_id, email_address, first_name, last_name, address, phone_number };
            next();
        })
    })
}

module.exports = { checkDuplicateEmailAddress, validateToken }