const { selectChildren, selectChildById, selectChildParentById, insertChild } = require('../services/children');
const { selectParentChildrenById } = require('../services/parents');
const bcrypt = require('bcrypt');

const getChildren = (req, res) => {
    selectChildren((err, results, fields) => {
        if (err) throw err;
        res.json(results);
    });
};

const getMyChildren = (req, res) => {
    const parent_id = req.user.user_id;

    selectParentChildrenById(parent_id, (err, results, fields) => {
        if (err) throw err;
        res.json(results);
    });
};

const getChildById = (req, res) => {
    const { child_id } = req.params;

    selectChildById(child_id, (err, results, fields) => {
        if (err) throw err;
        if (!results.length) return res.status(404).send('Child Not Found');

        res.json(results[0]);
    });
};

const getChildParentById = (req, res) => {
    const { child_id } = req.params;

    selectChildParentById(child_id, (err, results, fields) => {
        if (err) throw err;
        if (!results.length) return res.status(404).send('Parent Not Found');

        res.json(results[0]);
    });
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

    insertChild(child, (err, results, fields) => {
        if (err) throw err;
        res.status(201).send('Success');
    });
};

module.exports = { getChildren, getChildById, getChildParentById, createChild, getMyChildren };