const database = require('../config/database');

const selectParents = () => {
    return database.execute("SELECT `user_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number` FROM `user` WHERE user.role = 'parent'");
};

const selectParentById = (parent_id) => {
    return database.execute(
        "SELECT `user_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number` FROM `user` WHERE user_id = ? AND user.role = 'parent' LIMIT 1",
        [parent_id]
    );
};

const selectParentChildrenById = (parent_id) => {
    return database.execute(
        "SELECT `user_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number` FROM `user` WHERE user.parent_id = ? AND user.role = 'child'",
        [parent_id]
    );
};

module.exports = { selectParents, selectParentById, selectParentChildrenById };