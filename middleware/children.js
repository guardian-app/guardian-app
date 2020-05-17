const { selectChildParentById } = require('../services/children');

const isChildParent = (req, res, next) => {
    const { child_id } = req.params;
    const { user_id, role } = req.user;

    if (role === 'admin') return next();

    selectChildParentById(child_id, (err, results, fields) => {
        if (err) throw err;
        if (!results.length) return res.status(404).send('Not Found');

        const parent_id = results[0].user_id;
        if (user_id === parent_id) return next();

        return res.status(403).send('Forbidden');
    });
}

module.exports = { isChildParent }