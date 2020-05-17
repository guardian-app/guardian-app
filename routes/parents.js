const express = require('express');
const router = express.Router();
const { getParents } = require('../controllers/parents');
const { validateToken, isAdmin } = require('../middleware/users');

router.get('/', validateToken, isAdmin, getParents);
router.get('/:parent_id/children');
router.get('/:parent_id');

module.exports = router;
