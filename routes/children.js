const express = require('express');
const router = express.Router();
const { isAdmin, validateToken, checkDuplicateEmailAddress } = require('../middleware/users');
const { isChildParent } = require('../middleware/children');
const { isParent } = require('../middleware/parents');
const { getChildren, getChildById, getChildParentById, createChild, getMyChildren, updateChild, deleteChild } = require('../controllers/children');

router.get('/', validateToken, isAdmin, getChildren);
router.get('/mine', validateToken, getMyChildren);
router.get('/:child_id/parent', validateToken, isAdmin, getChildParentById);
router.get('/:child_id', validateToken, isChildParent, getChildById);
router.put('/:child_id', validateToken, isChildParent, updateChild);
router.delete('/:child_id', validateToken, isChildParent, deleteChild);
router.post('/create', validateToken, isParent, checkDuplicateEmailAddress, createChild);

module.exports = router;
