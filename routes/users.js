const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/users');
const { checkDuplicateEmailAddress } = require('../middleware/users');

router.post('/create', checkDuplicateEmailAddress, createUser);

module.exports = router;
