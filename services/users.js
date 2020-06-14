const database = require('../config/database');

const insertUser = (user) => {
    return database.execute(
        'INSERT INTO `user` (`email_address`, `password`, `first_name`, `last_name`, `address`, `phone_number`)  VALUES (?, ?, ?, ?, ?, ?)',
        [user.email_address, user.password, user.first_name, user.last_name, user.address, user.phone_number],
    );
};

const insertVerificationKey = (email_address, verification_key) => {
    return database.execute(
        'INSERT INTO `email_verification` (`user_id`, `verification_key`, `email_address`)  VALUES ((SELECT `user_id` FROM `user` WHERE user.email_address=?), ?, ?)',
        [email_address, verification_key, email_address],
    );
};

const insertPasswordResetKey = (user_id, email_address, reset_key) => {
    return database.execute(
        'INSERT INTO `password_reset` (`user_id`, `email_address`, `reset_key`)  VALUES (?, ?, ?)',
        [user_id, email_address, reset_key],
    );
};

const deleteVerificationKey = (email_address) => {
    return database.execute('DELETE FROM `email_verification` WHERE email_address = ?', [email_address]);
};

const deletePasswordResetKey = (email_address) => {
    return database.execute('DELETE FROM `password_reset` WHERE email_address = ?', [email_address]);
};

const selectVerificationKeyByEmailAddress = (email_address) => {
    return database.execute('SELECT * FROM `email_verification` WHERE `email_address` = ? LIMIT 1', [email_address]);
};

const selectUserByVerificationKey = (key) => {
    return database.execute('SELECT * FROM `email_verification` WHERE `verification_key` = ? LIMIT 1', [key]);
};

const selectPasswordResetKeyByEmailAddress = (email_address) => {
    return database.execute('SELECT * FROM `password_reset` WHERE `email_address` = ? LIMIT 1', [email_address]);
};

const selectUserByPasswordResetKey = (key) => {
    return database.execute('SELECT * FROM `password_reset` WHERE `reset_key` = ? LIMIT 1', [key]);
};

const activateUser = (user_id) => {
    return database.execute('UPDATE `user` SET `active`= TRUE WHERE user.user_id = ?', [user_id]);
}

const selectUserByEmailAddress = (email_address) => {
    return database.execute('SELECT * FROM `user` WHERE `email_address` = ? LIMIT 1', [email_address]);
};

const selectUserById = (user_id) => {
    return database.execute('SELECT * FROM `user` WHERE `user_id` = ? LIMIT 1', [user_id]);
};

const selectUserRoleById = (user_id) => {
    return database.execute('SELECT `role` FROM `user` WHERE user.user_id = ? LIMIT 1', [user_id]);
};

const updateUser = async (user) => {
    const tasks = [];

    tasks.push(
        database.execute(
            'UPDATE `user` SET email_address = ?, first_name = ?, last_name = ?, address = ?, phone_number = ? WHERE user_id = ?',
            [user.email_address, user.first_name, user.last_name, user.address, user.phone_number, user.user_id]
        )
    );

    if (user.password == null) {
        tasks.push(database.execute('UPDATE `user` SET password = ? WHERE user_id = ?', [user.password, user.user_id]));
    };

    return Promise.all(tasks);
};

const updateUserPassword = (user_id, password) => {
    return database.execute(
        'UPDATE `user` SET password = ? WHERE user_id = ?',
        [password, user_id]
    );
};

module.exports = { insertUser, selectUserByEmailAddress, selectUserById, selectUserRoleById, updateUser, insertVerificationKey, deleteVerificationKey, selectVerificationKeyByEmailAddress, selectUserByVerificationKey, activateUser, deletePasswordResetKey, insertPasswordResetKey, selectPasswordResetKeyByEmailAddress, selectUserByPasswordResetKey, updateUserPassword };