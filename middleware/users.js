const { getUserbyEmailAddress } = require('../services/users');

const checkDuplicateEmailAddress = (req, res, next) => {
    const { email_address } = req.body;

    getUserbyEmailAddress(email_address, (err, results, fields) => {
        if (err) throw err;
        if (results) {
            res.status(400).send('E-mail address is already registered!')
        } else {
            next();
        }
    });

}

module.exports = { checkDuplicateEmailAddress }