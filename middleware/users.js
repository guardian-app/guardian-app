const jwt = require('jsonwebtoken');
const { selectUserByEmailAddress, selectUserById, selectUserRoleById } = require('../services/users');
const { jwtSecret } = require('../config/jwt');

const checkDuplicateEmailAddress = (req, res, next) => {
    const { email_address } = req.body;

    selectUserByEmailAddress(email_address, (err, results, fields) => {
        if (err) throw err;
        if (results.length) return res.status(409).send('E-mail address is already registered!');
        next();
    });
}

const validateToken = (req, res, next) => {
    const { token } = req;
    if (!token) return res.status(401).send('Unauthorized');

    jwt.verify(token, jwtSecret, (err, dec) => {
        if (err) return res.status(401).send('Unauthorized');

        selectUserById(dec.user_id, (err, results, fields) => {
            if (err) throw err;
            if (!results.length) return res.status(401).send('Unauthorized');

            const { user_id, email_address, first_name, last_name, address, phone_number, role } = results[0];
            req.user = { user_id, email_address, first_name, last_name, address, phone_number, role };
            next();
        })
    })
}

const isAdmin = (req, res, next) => {
    const { user_id } = req.user;

    selectUserById(user_id, (err, results, fields) => {
        if (err) throw err;
        if (!results.length) return res.status(500).send();

        const { role } = results[0];

        if (role === 'admin') next();
        else return res.status(403).send('Forbidden');
    })
}

module.exports = { checkDuplicateEmailAddress, validateToken, isAdmin }