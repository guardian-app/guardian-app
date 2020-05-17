const express = require('express');
const router = express.Router();
const { createUser, authenticateUser, getProfile } = require('../controllers/users');
const { checkDuplicateEmailAddress, validateToken } = require('../middleware/users');

router.get('/me', validateToken, getProfile);
router.post('/create', checkDuplicateEmailAddress, createUser);
router.post('/authenticate', authenticateUser);

module.exports = router;
