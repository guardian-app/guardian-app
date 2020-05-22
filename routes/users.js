const express = require('express');
const router = express.Router();
const { createUser, authenticateUser, getProfile, updateProfile, resendVerificationKey } = require('../controllers/users');
const { checkDuplicateEmailAddress, validateToken } = require('../middleware/users');

router.post('/create', checkDuplicateEmailAddress, createUser);
router.post('/authenticate', authenticateUser);
router.post('/resend', resendVerificationKey);
router.get('/verify/:key', /* verifyUser */ );
router.get('/me', validateToken, getProfile);
router.put('/me', validateToken, updateProfile);

module.exports = router;
