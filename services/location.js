const database = require('../config/database');

const insertLocationRecord = (record, done) => {
    database.execute(
        'INSERT INTO `location_record` (`longitude`, `latitude`, `child_id`)  VALUES (?, ?, ?)',
        [record.longitude, record.latitude, record.child_id], done
    );
};

const insertLocationRecordBatch = (records_array, done) => {
    database.query(
        'INSERT INTO `location_record` (`longitude`, `latitude`, `timestamp`, `child_id`)  VALUES ?',
        [records_array], done
    );
};

module.exports = { insertLocationRecord, insertLocationRecordBatch }