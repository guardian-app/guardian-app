const bcrypt = require('bcrypt');
const { insertUser } = require('../services/users');

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
        res.json({results, fields})
    });
}

module.exports = { createUser }