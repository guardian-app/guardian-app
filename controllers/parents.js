const { selectParents } = require('../services/parents');

const getParents = async (req, res) => {
    selectParents((err, results, fields) => {
        if (err) throw err;
        res.json(results);
    })
}

module.exports = { getParents }