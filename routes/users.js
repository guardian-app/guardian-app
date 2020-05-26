const express = require('express');
const router = express.Router();
const { createUser, authenticateUser, getProfile, updateProfile, resendVerificationKey, verifyUser, sendPasswordResetKey, updatePassword } = require('../controllers/users');
const { checkDuplicateEmailAddress, validateToken } = require('../middleware/users');

router.post('/create', checkDuplicateEmailAddress, createUser);
router.post('/authenticate', authenticateUser);
router.post('/resend', resendVerificationKey);
router.post('/reset', sendPasswordResetKey);
router.put('/reset', updatePassword);
router.put('/me', validateToken, updateProfile);
router.get('/me', validateToken, getProfile);
router.get('/verify/:key', verifyUser);

module.exports = router;
