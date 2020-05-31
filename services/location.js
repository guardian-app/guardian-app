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

const selectLatestLocation = (child_id, done) => {
    database.execute(
        "SELECT `longitude`, `latitude`, `timestamp` FROM `location_record` WHERE `timestamp`=(SELECT MAX(`timestamp`) FROM `location_record` WHERE `child_id`=?) LIMIT 1",
        [child_id], done
    );
};

module.exports = { insertLocationRecord, insertLocationRecordBatch, selectLatestLocation }