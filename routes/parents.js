const express = require('express');
const router = express.Router();
const { getParents, getParent, getParentChildren } = require('../controllers/parents');
const { validateToken, isAdmin } = require('../middleware/users');
const { isOwner } = require('../middleware/parents');

router.get('/', validateToken, isAdmin, getParents);
router.get('/:parent_id/children', validateToken, isOwner, getParentChildren);
router.get('/:parent_id', validateToken, isOwner, getParent);

module.exports = router;