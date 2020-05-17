const express = require('express');
const router = express.Router();
const { isAdmin, validateToken } = require('../middleware/users');
const { isChildParent } = require('../middleware/children');
const { getChildren, getChildById, getChildParentById } = require('../controllers/children');

router.get('/', validateToken, isAdmin, getChildren);
router.get('/:child_id/parent', validateToken, isAdmin, getChildParentById);
router.get('/:child_id', validateToken, isChildParent, getChildById);

module.exports = router;
