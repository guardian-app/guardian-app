const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const { insertUser, selectUserByEmailAddress, updateUser, insertVerificationKey, deleteVerificationKey, selectVerificationKeyByEmailAddress, selectUserByVerificationKey, activateUser, deletePasswordResetKey, insertPasswordResetKey, updateUserPassword, selectUserByPasswordResetKey } = require('../services/users');
const { jwtSecret } = require('../config/jwt');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../config/nodemailer');

const createUser = async (req, res) => {
    const { email_address, first_name, last_name, address, phone_number } = req.body;
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

    try {
        await insertUser(user),
        await insertVerificationKey(email_address, key)

        res.status(201).send('Success');
        await sendVerificationEmail(email_address, key);
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
}

const authenticateUser = async (req, res) => {
    const { password, email_address } = req.body;

    try {
        const [users] = await selectUserByEmailAddress(email_address);
        if (!users.length) return res.status(404).send('E-mail address is not registered!');

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).send('Incorrect password!');
        if (!user.active) return res.status(401).send('E-mail address is not verified!');

        const token = jwt.sign({ user_id: user.user_id }, jwtSecret, { expiresIn: 259200 /* 72 hours */ });
        res.json({
            token,
            user: {
                user_id: user.user_id,
                email_address: user.email_address,
                role: user.role,
                first_name: user.first_name,
                last_name: user.last_name,
                address: user.address,
                phone_number: user.phone_number
            }
        });
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send();
    };
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

    try {
        await updateUser(user);

        const { email_address, first_name, last_name, address, phone_number } = user;
        res.json({ email_address, first_name, last_name, address, phone_number });
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const resendVerificationKey = async (req, res) => {
    const { email_address } = req.body;
    const key = nanoid();

    try {
        const [keys] = await selectVerificationKeyByEmailAddress(email_address);
        if (!keys.length) return res.status(404).send('Not Found');

        // Not possible to use Promise.all() in here
        // If insertVerificationKey() resolves first, then it'd delete the newly added key
        await deleteVerificationKey(email_address);
        await insertVerificationKey(email_address, key);

        res.status(201).send('Success');
        await sendVerificationEmail(email_address, key);
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const verifyUser = async (req, res) => {
    const { key } = req.params;

    try {
        const [users] = await selectUserByVerificationKey(key);
        if (!users.length) return res.status(404).send('Verification key is invalid!');

        const { user_id, email_address, expires_on } = users[0];

        if (expires_on <= new Date()) return res.status(404).send('Verification key is expired!');
        // These operations are not dependent of eachother, hence parallelizable
        await Promise.all([activateUser(user_id), deleteVerificationKey(email_address)]);

        res.status(200).send('Success');
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const sendPasswordResetKey = async (req, res) => {
    const { email_address } = req.body;
    const key = nanoid();

    try {
        const [users] = await selectUserByEmailAddress(email_address);

        // We shouldn't show an error if the e-mail address is non-existent
        // It exposes a potential security risk
        if (!users.length) return res.status(200).send('Success');

        const { user_id } = users[0];

        // Not possible to use Promise.all() since below operations should be performed sequentially
        await deletePasswordResetKey(email_address);
        await insertPasswordResetKey(user_id, email_address, key);

        res.status(200).send('Success');
        await sendPasswordResetEmail(email_address, key);
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const updatePassword = async (req, res) => {
    const { email_address, reset_key } = req.body;
    const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

    try {
        const [users] = await selectUserByPasswordResetKey(reset_key);

        // We shouldn't show an error if the key is non-existent
        // It exposes a potential security risk
        if (!users.length) return res.status(200).send('Success');

        const user = users[0];
        const { user_id, expires_on } = user;

        // Check e-mail address to prevent brute-forcing password reset keys
        if (user.email_address !== email_address) return res.status(200).send('Success'); // Same security risk here
        if (expires_on <= new Date()) return res.status(404).send('Verification key is expired!');

        // Perform these tasks parallely because they're are not interdependent
        await Promise.all([
            updateUserPassword(user_id, password),
            deletePasswordResetKey(email_address)
        ]);

        res.status(200).send('Success');
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

module.exports = { createUser, authenticateUser, getProfile, updateProfile, resendVerificationKey, verifyUser, sendPasswordResetKey, updatePassword };