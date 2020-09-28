const express = require('express');
const router = express.Router();

const { getLocation, getLocationHistory, createLocationRecord, createLocationRecordBatch, getLocationHistoryByDate } = require('../controllers/location');
const { isChildParent, isOwner } = require('../middleware/children');
const { validateToken } = require('../middleware/users');

router.get('/:child_id', validateToken, isChildParent, getLocation);
router.get('/:child_id/history', validateToken, isChildParent, getLocationHistory);
router.get('/:child_id/history/:date', validateToken, isChildParent, getLocationHistoryByDate);
router.post('/:child_id', validateToken, isOwner, createLocationRecord);
router.post('/:child_id/batch', validateToken, isOwner, createLocationRecordBatch);

module.exports = router;