const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { insertUser, selectUserByEmailAddress, updateUser, insertVerificationKey, deleteVerificationKey, selectVerificationKeyByEmailAddress, selectUserByVerificationKey, activateUser } = require('../services/users');
const { jwtSecret } = require('../config/jwt');
const { sendVerificationEmail } = require('../config/nodemailer');
const nanoid = require('nanoid');

const createUser = async (req, res) => {
    const { email_address, password, first_name, last_name, address, phone_number } = req.body;
    const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    const key = nanoid();

    const user = {
        email_address,
        first_name,
        last_name,
        address,
        phone_number,
        password
    };

    insertUser(user, async (err, results, fields) => {
        if (err) throw err;
        insertVerificationKey(email_address, key, (err, results, fields) => {
            if (err) throw err;
            sendVerificationEmail(email_address, key, (err, info) => {
                res.status(201).send('Success');
            });
        });
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

        if (!user.active) return res.status(401).send('E-mail address is not verified!');

        const token = jwt.sign({ user_id: user.user_id }, jwtSecret, { expiresIn: 86400 /* 24 hours */ });
        res.json({ token });
    });
};

const getProfile = (req, res) => {
    res.json(req.user);
};

const updateProfile = async (req, res) => {
    const oldUser = req.user;
    const newUser = req.body;

    const user = {
        user_id: oldUser.user_id,
        email_address: newUser.email_address || oldUser.email_address,
        first_name: newUser.first_name || oldUser.first_name,
        last_name: newUser.last_name || oldUser.last_name,
        address: newUser.address || oldUser.address,
        phone_number: newUser.phone_number || oldUser.phone_number,
        password: newUser.password != null ? await bcrypt.hash(newUser.password, await bcrypt.genSalt(10)) : undefined
    };

    updateUser(user, (err, results, fields) => {
        if (err) throw err;

        const { email_address, first_name, last_name, address, phone_number } = user;
        res.json({ email_address, first_name, last_name, address, phone_number });
    });
};

const resendVerificationKey = async (req, res) => {
    const { email_address } = req.body;
    const key = nanoid();

    selectVerificationKeyByEmailAddress(email_address, (err, results, fields) => {
        if (err) throw err;
        if (!results.length) return res.status(404).send('Not Found');

        deleteVerificationKey(email_address, async (err, results, fields) => {
            if (err) throw err;
            insertVerificationKey(email_address, key, (err, results, fields) => {
                if (err) throw err;
                sendVerificationEmail(email_address, key, (err, info) => {
                    res.status(201).send('Success');
                });
            });
        });
    });
};

const verifyUser = async (req, res) => {
    const { key } = req.params;

    selectUserByVerificationKey(key, (err, results, fields) => {
        if (err) throw err;
        if (!results.length) return res.status(404).send('Verification key is invalid!');

        const { user_id, email_address, expires_on } = results[0];

        if (expires_on <= new Date()) return res.status(404).send('Verification key is expired!');

        activateUser(user_id, (err, results, fields) => {
            if (err) throw err;
            deleteVerificationKey(email_address, (err, results, fields) => {
                if (err) throw err;
                res.status(200).send('Success');
            });
        });
    });
};

module.exports = { createUser, authenticateUser, getProfile, updateProfile, resendVerificationKey, verifyUser };