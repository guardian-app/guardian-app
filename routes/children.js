const express = require('express');
const router = express.Router();
const { isAdmin, validateToken, checkDuplicateEmailAddress } = require('../middleware/users');
const { isChildParent } = require('../middleware/children');
const { isParent } = require('../middleware/parents');
const { getChildren, getChildById, getChildParentById, createChild } = require('../controllers/children');

router.get('/', validateToken, isAdmin, getChildren);
router.get('/:child_id/parent', validateToken, isAdmin, getChildParentById);
router.get('/:child_id', validateToken, isChildParent, getChildById);
router.post('/create', validateToken, isParent, checkDuplicateEmailAddress, createChild);

module.exports = router;
