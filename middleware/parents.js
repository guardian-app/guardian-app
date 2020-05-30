const isOwner = (req, res, next) => {
    const { parent_id } = req.params;
    const { user_id, role } = req.user;

    if (user_id == parent_id || role === `admin`) next();
    else return res.status(403).send('Forbidden');
};

const isParent = (req, res, next) => {
    const { role } = req.user;

    if (role === `parent` || role === `admin`) next();
    else return res.status(403).send('Forbidden');
};

module.exports = { isOwner, isParent };