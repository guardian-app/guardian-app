const { selectChildren, selectChildById, selectChildParentById, insertChild } = require('../services/children');
const { selectParentChildrenById } = require('../services/parents');
const bcrypt = require('bcrypt');

const getChildren = async (req, res) => {
    try {
        const [children] = await selectChildren();
        res.json(children);
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const getMyChildren = async (req, res) => {
    const parent_id = req.user.user_id;

    try {
        const [children] = await selectParentChildrenById(parent_id);
        res.json(children);
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const getChildById = async (req, res) => {
    const { child_id } = req.params;

    try {
        const [children] = await selectChildById(child_id);
        if (!children.length) return res.status(404).send('Child Not Found');

        res.json(children[0]);
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const getChildParentById = async (req, res) => {
    const { child_id } = req.params;

    try {
        const [parents] = await selectChildParentById(child_id);
        if (!parents.length) return res.status(404).send('Parent Not Found');

        res.json(parents[0]);
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const createChild = async (req, res) => {
    const { email_address, first_name, last_name, address, phone_number } = req.body;
    const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    const parent_id = req.user.user_id;

    const child = {
        email_address,
        password,
        first_name,
        last_name,
        address,
        phone_number,
        parent_id
    };

    try {
        await insertChild(child);
        res.status(201).send('Success');
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

module.exports = { getChildren, getChildById, getChildParentById, createChild, getMyChildren };