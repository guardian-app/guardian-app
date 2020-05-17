const express = require('express');
const router = express.Router();

router.get('/');
router.get('/:child_id/parent');
router.get('/:child_id');

module.exports = router;
