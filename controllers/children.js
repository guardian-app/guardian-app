const { selectChildren, selectChildById, selectChildParentById } = require('../services/children');

const getChildren = (req, res) => {
    selectChildren((err, results, fields) => {
        if (err) throw err;
        res.json(results);
    })
}

const getChildById = (req, res) => {
    const { child_id } = req.params;

    selectChildById(child_id, (err, results, fields) => {
        if (err) throw err;
        if (!results.length) return res.status(404).send('Child Not Found');

        res.json(results[0]);
    })
}

const getChildParentById = (req, res) => {
    const { child_id } = req.params;

    selectChildParentById(child_id, (err, results, fields) => {
        if (err) throw err;
        if (!results.length) return res.status(404).send('Parent Not Found');

        res.json(results[0]);
    })
}

module.exports = { getChildren, getChildById, getChildParentById }