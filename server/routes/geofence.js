const express = require('express');
const router = express.Router();
const { getGeofence, createGeofence, deleteGeofence } = require('../controllers/geofence');
const { isChildParent } = require('../middleware/children');
const { validateToken } = require('../middleware/users');

router.get('/:child_id', validateToken, getGeofence);
router.post('/:child_id', validateToken, isChildParent, createGeofence);
router.delete('/:child_id/:geofence_id', validateToken, isChildParent, deleteGeofence);

module.exports = router;
