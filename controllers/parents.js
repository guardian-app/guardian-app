const { selectParents, selectParentById } = require('../services/parents');

const getParents = (req, res) => {
    selectParents((err, results, fields) => {
        if (err) throw err;
        res.json(results);
    })
}

const getParent = (req, res) => {
    const { parent_id } = req.params;

    selectParentById(parent_id, (err, results, fields) => {
        if (err) throw err;
        if (!results.length) return res.status(404).send('Parent Not Found');

        res.json(results[0]);
    })
}

module.exports = { getParents, getParent }