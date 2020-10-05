const { selectParents, selectParentById, selectParentChildrenById } = require('../services/parents');

const getParents = async (req, res) => {
    try {
        const [parents] = await selectParents();
        res.json(parents);
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const getParent = async (req, res) => {
    const { parent_id } = req.params;

    try {
        const [parents] = await selectParentById(parent_id);
        if (!parents.length) return res.status(404).send('Parent Not Found');

        res.json(parents[0]);
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const getParentChildren = async (req, res) => {
    const { parent_id } = req.params;

    try {
        const [children] = await selectParentChildrenById(parent_id);
        if (children.length) return res.json(children);

        const [parent] = await selectParentById(parent_id);
        if (!parent.length) return res.status(404).send('Parent Not Found');
        else return res.json({});
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

module.exports = { getParents, getParent, getParentChildren };