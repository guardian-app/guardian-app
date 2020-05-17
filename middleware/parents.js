const isOwner = (req, res, next) => {
    const { parent_id } = req.params;
    const { user_id, role } = req.user;

    if (user_id === parent_id) next();
    if (role === `admin`) next();
    else return res.status(403).send('Forbidden');
}

module.exports = { isOwner }