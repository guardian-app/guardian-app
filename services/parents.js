const database = require('../config/database');

const selectParents = (done) => {
    database.execute(
        "SELECT `user_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number` FROM `user` WHERE user.role='parent'",
        done
    );
};

const selectParentById = (parent_id, done) => {
    database.execute(
        "SELECT `user_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number` FROM `user` WHERE user.role='parent' AND user_id=?",
        [parent_id],
        done
    );
};

module.exports = { selectParents, selectParentById }