const database = require('../config/database');

const selectChildren = () => {
    return database.execute(
        "SELECT `user_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number` FROM `user` WHERE user.role = 'child'",
    );
};

const selectChildById = (child_id) => {
    return database.execute(
        "SELECT `user_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number` FROM `user` WHERE user_id = ? AND user.role = 'child' LIMIT 1",
        [child_id]
    );
};

const selectChildParentById = (child_id) => {
    return database.execute(
        "SELECT `user_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number` FROM `user` WHERE user_id=(SELECT `parent_id` FROM `user` WHERE user.user_id = ? LIMIT 1) AND user.role = 'parent' LIMIT 1",
        [child_id]
    );
};

const insertChild = (child) => {
    return database.execute(
        'INSERT INTO `user` (`email_address`, `password`, `first_name`, `last_name`, `address`, `phone_number`, `parent_id`, `role`, `active`)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [child.email_address, child.password, child.first_name, child.last_name, child.address, child.phone_number, child.parent_id, `child`, 1]
    );
};

const deleteChildById = (child_id) => {
    return database.execute(
        'DELETE FROM `user` WHERE user_id=?',
        [child_id]
    );
}

module.exports = { selectChildren, selectChildById, selectChildParentById, insertChild, deleteChildById };