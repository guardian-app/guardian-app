const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { insertUser, selectUserByEmailAddress } = require('../services/users');
const { jwtSecret } = require('../config/jwt');

const createUser = async (req, res) => {
    const { email_address, password, first_name, last_name, address, phone_number } = req.body;
    const password_hash = await bcrypt.hash(password, await bcrypt.genSalt(10));

    const user = {
        email_address,
        password: password_hash,
        first_name,
        last_name,
        address,
        phone_number
    }

    insertUser(user, (err, results, fields) => {
        if (err) throw err;
        res.status(201).send('Success');
    });
}

const authenticateUser = async (req, res) => {
    const { email_address, password } = req.body;

    selectUserByEmailAddress(email_address, async (err, results, fields) => {
        if (err) throw err;
        if (!results.length) return res.status(404).send('E-mail address is not registered!');

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send('Incorrect password!');

        const token = jwt.sign({ user_id: user.user_id }, jwtSecret, { expiresIn: 86400 /* 24 hours */ });
        res.json({ token });
    });

}

const getProfile = (req, res) => {
    res.json({ ...req.user });
}

module.exports = { createUser, authenticateUser, getProfile }