const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const { selectContactByEmailAddress } = require('../services/users');
const { insertContact, selectByContactId, selectContactByParentId, removeContactById } = require('../services/contact');

const { jwtSecret } = require('../config/jwt');
const { sendVerificationEmail } = require('../config/nodemailer');


const createContact = async( req, res) => {
    console.log("come contact")
    const {email_address, first_name, last_name, address, phone_number, relationship} = req.body;
    const parent_id = req.user.user_id;
    console.log(first_name);

    const contact = {
        email_address,
        first_name,
        last_name,
        address,
        phone_number,
        relationship,
        parent_id
    };

    try{
        await insertContact(contact);

        const [contacts] = await selectContactByEmailAddress(email_address);
        console.log(contacts)
        res.status(201).json({ ...contacts[0] });
    }
    catch(err){
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    }
}

const getContactByParentId = async (req, res) => {
    const { parent_id } = req.params;
    try {
        const [contacts] = await selectContactByParentId(parent_id);
        res.json(contact);
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
}

const removeContact =async (req, res) => {
    const { contact_id } = req.params;
    try{
        const [isRemoved] = await removeContactById(contact_id);
        res.json(isRemoved);
    }
    catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };

};

const editContact = async (req, res) => {

}

module.exports = { createContact, getContactByParentId, removeContact, editContact };