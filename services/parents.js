const database = require('../config/database');

const selectParents = (done) => {
    database.execute(
        "SELECT `user_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number` FROM `user` WHERE user.role='parent'",
        done
    );
};

const selectParentById = (parent_id, done) => {
    database.execute(
        "SELECT `user_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number` FROM `user` WHERE user_id=? AND user.role='parent' LIMIT 1",
        [parent_id],
        done
    );
};

const selectParentChildrenById = (parent_id, done) => {
    database.execute(
        "SELECT `user_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number` FROM `user` WHERE user.parent_id=? AND user.role='child'",
        [parent_id],
        done
    );
}

module.exports = { selectParents, selectParentById, selectParentChildrenById }