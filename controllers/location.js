const { insertLocationRecord, insertLocationRecordBatch, selectLatestLocation } = require('../services/location');

const createLocationRecord = async (req, res) => {
    const { child_id } = req.params;
    const { longitude, latitude } = req.body;

    try {
        await insertLocationRecord({ child_id, longitude, latitude });
        res.status(200).send('Success');
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const createLocationRecordBatch = async (req, res) => {
    const { child_id } = req.params;
    const { data } = req.body;

    // We should convert the JSON array to regular array
    // Because mysql2 Prepared Statements doesn't support JSON arrays 
    const data_array = data.map(({ longitude, latitude, timestamp }) => [longitude, latitude, timestamp, child_id]);

    try {
        await insertLocationRecordBatch(data_array);
        res.status(200).send('Success');
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const getLocation = async (req, res) => {
    const { child_id } = req.params;

    try {
        const [location_data] = await selectLatestLocation(child_id);
        if (!location_data.length) return res.status(404).send('Data Not Found');

        res.json(location_data[0]);
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};

const getLocationHistory = async (req, res) => {

};

module.exports = { getLocation, getLocationHistory, createLocationRecord, createLocationRecordBatch };