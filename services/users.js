const database = require('../config/database');

const insertUser = (user, done) => {
    database.execute(
        'INSERT INTO `user` (`email_address`, `password`, `first_name`, `last_name`, `address`, `phone_number`)  VALUES (?, ?, ?, ?, ?, ?)',
        [user.email_address, user.password, user.first_name, user.last_name, user.address, user.phone_number],
        done
    );
};

const selectUserByEmailAddress = (email_address, done) => {
    database.execute('SELECT * FROM `user` WHERE `email_address` = ? LIMIT 1', [email_address], done)
}

const selectUserById = (user_id, done) => {
    database.execute('SELECT * FROM `user` WHERE `user_id` = ? LIMIT 1', [user_id], done)
}

module.exports = { insertUser, selectUserByEmailAddress, selectUserById }