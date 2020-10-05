const jwt = require('jsonwebtoken');
const { selectUserByEmailAddress, selectUserById } = require('../services/users');
const { jwtSecret } = require('../config/jwt');

const checkDuplicateEmailAddress = async (req, res, next) => {
    const { email_address } = req.body;

    try {
        const [users] = await selectUserByEmailAddress(email_address);
        if (users.length) return res.status(409).send('E-mail address is already registered!');

        next();
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const validateToken = async (req, res, next) => {
    const { token } = req;
    if (!token) return res.status(401).send('Unauthorized');

    jwt.verify(token, jwtSecret, async (err, payload) => {
        if (err || !payload) return res.status(401).send('Unauthorized');

        try {
            const [users] = await selectUserById(payload.user_id);
            if (!users.length) return res.status(401).send('Unauthorized');

            const user = users[0];
            req.user = {
                user_id: user.user_id,
                email_address: user.email_address,
                first_name: user.first_name,
                last_name: user.last_name,
                address: user.address,
                phone_number: user.phone_number,
                role: user.role
            };

            next();
        } catch (err) {
            console.warn(`Generic: ${err}`);
            res.status(500).send('Internal Server Error');
        };
    });
};

const isAdmin = async (req, res, next) => {
    const { user_id } = req.user;

    try {
        const [users] = await selectUserById(user_id);
        if (!users.length) return res.status(500).send();

        const { role } = users[0];

        if (role === 'admin') next();
        else return res.status(403).send('Forbidden');
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

module.exports = { checkDuplicateEmailAddress, validateToken, isAdmin };