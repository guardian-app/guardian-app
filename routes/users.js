const express = require('express');
const router = express.Router();
const { createUser, authenticateUser } = require('../controllers/users');
const { checkDuplicateEmailAddress } = require('../middleware/users');

router.post('/create', checkDuplicateEmailAddress, createUser);
router.post('/authenticate', authenticateUser);

module.exports = router;
