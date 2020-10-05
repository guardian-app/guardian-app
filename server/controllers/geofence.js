const { selectGeofenceByChildId, insertGeofence, deleteGeofenceById } = require('../services/geofence');

const getGeofence = async (req, res) => {
    const { child_id } = req.params;

    try {
        const [geofence] = await selectGeofenceByChildId(child_id);
        res.json(geofence);
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
}

const createGeofence = async (req, res) => {
    const { child_id } = req.params;
    const { longitude, latitude, radius } = req.body;

    try {
        await insertGeofence({ child_id, longitude, latitude, radius });
        res.status(200).send('Success');
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
}

const deleteGeofence = async (req, res) => {
    const { geofence_id } = req.params;

    try {
        await deleteGeofenceById(geofence_id);
        res.status(200).send('Success');
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
}

module.exports = { getGeofence, createGeofence, deleteGeofence };