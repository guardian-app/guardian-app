const database = require('../config/database');

const insertUser = (user, done) => {
    database.execute(
        'INSERT INTO `user` (`email_address`, `password`, `first_name`, `last_name`, `address`, `phone_number`)  VALUES (?, ?, ?, ?, ?, ?)',
        [user.email_address, user.password, user.first_name, user.last_name, user.address, user.phone_number],
        done
    );
};

const insertVerificationKey = (email_address, verification_key, done) => {
    database.execute(
        'INSERT INTO `email_verification` (`user_id`, `verification_key`, `email_address`)  VALUES ((SELECT `user_id` FROM `user` WHERE user.email_address=?), ?, ?)',
        [email_address, verification_key, email_address],
        done
    );
};

const insertPasswordResetKey = (user_id, email_address, reset_key, done) => {
    database.execute(
        'INSERT INTO `password_reset` (`user_id`, `email_address`, `reset_key`)  VALUES (?, ?, ?)',
        [user_id, email_address, reset_key],
        done
    );
};

const deleteVerificationKey = (email_address, done) => {
    database.execute(
        'DELETE FROM `email_verification` WHERE email_address=?',
        [email_address],
        done
    );
};

const deletePasswordResetKey = (email_address, done) => {
    database.execute(
        'DELETE FROM `password_reset` WHERE email_address=?',
        [email_address],
        done
    );
};

const selectVerificationKeyByEmailAddress = (email_address, done) => {
    database.execute('SELECT * FROM `email_verification` WHERE `email_address` = ? LIMIT 1', [email_address], done)
};

const selectUserByVerificationKey = (key, done) => {
    database.execute('SELECT * FROM `email_verification` WHERE `verification_key` = ? LIMIT 1', [key], done)
};

const selectPasswordResetKeyByEmailAddress = (email_address, done) => {
    database.execute('SELECT * FROM `password_reset` WHERE `email_address` = ? LIMIT 1', [email_address], done)
};

const selectUserByPasswordResetKey = (key, done) => {
    database.execute('SELECT * FROM `password_reset` WHERE `reset_key` = ? LIMIT 1', [key], done)
};

const activateUser = (user_id, done) => {
    database.execute('UPDATE `user` SET `active`=TRUE WHERE user.user_id=?', [user_id], done);
}

const selectUserByEmailAddress = (email_address, done) => {
    database.execute('SELECT * FROM `user` WHERE `email_address` = ? LIMIT 1', [email_address], done)
};

const selectUserById = (user_id, done) => {
    database.execute('SELECT * FROM `user` WHERE `user_id` = ? LIMIT 1', [user_id], done)
};

const selectUserRoleById = (user_id, done) => {
    database.execute('SELECT `role` FROM `user` WHERE user.user_id = ? LIMIT 1', [user_id], done)
};

const updateUser = (user, done) => {
    database.execute(
        'UPDATE `user` SET email_address=?, first_name=?, last_name=?, address=?, phone_number=? WHERE user_id=?',
        [user.email_address, user.first_name, user.last_name, user.address, user.phone_number, user.user_id],
        (err1, results1, fields1) => {
            if (user.password == null) return done(err1, results1, fields1);
            database.execute(
                'UPDATE `user` SET password=? WHERE user_id=?',
                [user.password, user.user_id],
                (err2, results2, fields2) => done(err1 || err2, results1, fields1)
            );
        }
    );
};

const updateUserPassword = (user_id, password, done) => {
    database.execute(
        'UPDATE `user` SET password=? WHERE user_id=?',
        [password, user_id],
        done
    );
};

module.exports = { insertUser, selectUserByEmailAddress, selectUserById, selectUserRoleById, updateUser, insertVerificationKey, deleteVerificationKey, selectVerificationKeyByEmailAddress, selectUserByVerificationKey, activateUser, deletePasswordResetKey, insertPasswordResetKey, selectPasswordResetKeyByEmailAddress, selectUserByPasswordResetKey, updateUserPassword };