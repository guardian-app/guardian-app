const express = require('express');
const router = express.Router();
const { createUser, authenticateUser, getProfile, updateProfile } = require('../controllers/users');
const { checkDuplicateEmailAddress, validateToken } = require('../middleware/users');

router.get('/me', validateToken, getProfile);
router.put('/me', validateToken, updateProfile);
router.post('/create', checkDuplicateEmailAddress, createUser);
router.post('/authenticate', authenticateUser);

module.exports = router;
