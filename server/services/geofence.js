const database = require('../config/database');
const geofence = require('../controllers/geofence');

const selectGeofenceByChildId = (child_id) => {
    return database.execute(
        'SELECT `geofence_id`, `longitude`, `latitude` FROM `geofence` WHERE `child_id` = ?',
        [child_id]
    );
};

const insertGeofence = (geofence) => {
    return database.execute(
        'INSERT INTO `geofence` (`child_id`, `longitude`, `latitude`, `radius`) VALUES (?, ?, ?, ?)',
        [geofence.child_id, geofence.longitude, geofence.latitude, geofence.radius]
    );
}

const deleteGeofenceById = (geofence_id) => {
    return database.execute(
        'DELETE FROM `geofence` WHERE `geofence_id` = ?',
        [geofence_id]
    )
}

module.exports = { selectGeofenceByChildId, insertGeofence, deleteGeofenceById }