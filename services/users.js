const database = require('../config/database');

const insertUser = (user, done) => {
    database.execute(
        'INSERT INTO `user` (`email_address`, `password`, `first_name`, `last_name`, `address`, `phone_number`)  VALUES(?, ?, ?, ?, ?, ?)',
        [user.email_address, user.password, user.first_name, user.last_name, user.address, user.phone_number],
        done
    );
};

const getUserbyEmailAddress = (email_address, done) => {
    database.execute('SELECT * FROM `user` WHERE `email_address`=? LIMIT 1', [email_address], done)
}

module.exports = { insertUser, getUserbyEmailAddress }