const { insertLocationRecord, insertLocationRecordBatch } = require('../services/location');

const createLocationRecord = (req, res) => {
    const { child_id } = req.params;
    const { longitude, latitude } = req.body;

    insertLocationRecord({ child_id, longitude, latitude }, (err) => {
        if (err) throw err;
        res.status(200).send('Success');
    });
};

const createLocationRecordBatch = (req, res) => {
    const { child_id } = req.params;
    const { data } = req.body;

    // We should convert the JSON array to regular array
    // Because mysql2 Prepared Statements doesn't support JSON arrays 
    const data_array = data.map(({ longitude, latitude, timestamp }) => [longitude, latitude, timestamp, child_id]);

    insertLocationRecordBatch(data_array, (err) => {
        if (err) throw err;
        res.status(200).send('Success');
    });
};

const getLocation = (req, res) => {
    const { child_id } = req.params;

    selectLatestLocation(child_id, (err, results) => {
        if (err) throw err;
        if (!results.length) res.status(404).send('Data Not Found');

        const data = results[0];
        res.json(data);
    })
};

const getLocationHistory = (req, res) => {
    const { child_id } = req.params;

};

module.exports = { getLocation, getLocationHistory, createLocationRecord, createLocationRecordBatch };