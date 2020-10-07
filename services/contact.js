const database = require('../config/database');

// const selectChildren = () => {
//     return database.execute(
//         "SELECT `user_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number` FROM `user` WHERE user.role = 'child'",
//     );
// };

const selectByContactId = (contact_id) => {
    return database.execute(
        "SELECT `contact_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number`,`relationship` FROM `trusted_contact` WHERE parent_id = ? LIMIT 1",
        [contact_id]
    );
};

const selectContactByParentId = (parent_id) => {
    return database.execute(
        "SELECT `contact_id`, `email_address`, `first_name`, `last_name`, `address`, `phone_number`,`relationship` FROM `trusted_contact` WHERE parent_id = ?",
        //(SELECT `parent_id` FROM `user` WHERE user.user_id = ? LIMIT 1) AND user.role = 'parent' LIMIT 1
        [parent_id]
    );
};

const insertContact = (contact) => {
    return database.execute(
        'INSERT INTO `trusted_contact` (`email_address`, `first_name`, `last_name`, `address`, `phone_number`,`relationship`, `parent_id`)  VALUES (?, ?, ?, ?, ?, ?,?)',
        [contact.email_address, contact.first_name, contact.last_name, contact.address, contact.phone_number,contact.relationship, contact.parent_id]
    );
};

const removeContactById = (contact_id) => {
    return database.execute(
        'DELETE FROM `trusted_contact` WHERE contact_id = ?',
        [contact_id]
    );
};

const editContact = (contact) => {
    return database.execute(
        'UPDATE `trusted_contact` SET `email_address` = ?, `first_name` = ?, `last_name` =  ?, `address` = ?, `phone_number` = ?,`relationship` = ?, `parent_id` = ? WHERE `contact_id = ?`',
        [contact.email_address, contact.first_name, contact.last_name, contact.address, contact.phone_number,contact.relationship, contact.parent_id, contact.contact_id]
    );
}

module.exports = { selectByContactId, selectContactByParentId, insertContact, removeContactById, editContact };