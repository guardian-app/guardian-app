const { selectChildParentById } = require('../services/children');

const isOwner = (req, res, next) => {
    const { child_id } = req.params;
    const { user_id, role } = req.user;

    if (user_id == child_id || role === `admin`) next();
    else return res.status(403).send('Forbidden');
};

const isChildParent = async (req, res, next) => {
    const { child_id } = req.params;
    const { user_id, role } = req.user;
    console.log('daaaa',child_id)
    if (role === 'admin') return next();

    try {
        const [parents] = await selectChildParentById(child_id);
        if (!parents.length) return res.status(404).send('Not Found');

        const parent_id = parents[0].user_id;
        if (user_id == parent_id) return next();

        return res.status(403).send('Forbidden');
    } catch (err) {
        console.warn(`Database: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

module.exports = { isChildParent, isOwner };