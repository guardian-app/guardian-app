const express = require('express');
const router = express.Router();

const { getLocation, getLocationHistory, createLocationRecord, createLocationRecordBatch } = require('../controllers/location');
const { isChildParent, isOwner } = require('../middleware/children');
const { validateToken } = require('../middleware/users');

router.get('/:child_id', validateToken, isChildParent, getLocation);
router.get('/:child_id/history', validateToken, isChildParent, getLocationHistory);
router.post('/:child_id', validateToken, isOwner, createLocationRecord);
router.post('/:child_id/batch', validateToken, isOwner, createLocationRecordBatch);

module.exports = router;