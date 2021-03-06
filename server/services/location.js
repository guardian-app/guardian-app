const database = require('../config/database');

const insertLocationRecord = (record) => {
    return database.execute(
        'INSERT INTO `location_record` (`longitude`, `latitude`, `child_id`)  VALUES (?, ?, ?)',
        [record.longitude, record.latitude, record.child_id]
    );
};

const insertLocationRecordBatch = (records_array) => {
    return database.query(
        'INSERT INTO `location_record` (`longitude`, `latitude`, `timestamp`, `child_id`)  VALUES ?',
        [records_array]
    );
};

const selectLatestLocation = (child_id) => {
    return database.execute(
        "SELECT `longitude`, `latitude`, `timestamp` FROM `location_record` WHERE `timestamp` = (SELECT MAX(`timestamp`) FROM `location_record` WHERE `child_id` = ?) LIMIT 1",
        [child_id]
    );
};

const selectTodayLocationHistory = (child_id) => {
    return database.execute(
        "SELECT `longitude`, `latitude`, `timestamp` FROM `location_record` WHERE DATE(`timestamp`) = CURDATE() AND `child_id` = ? ORDER BY `timestamp` DESC LIMIT 48",
        [child_id]
    );
};

const selectLocationHistoryByDate = (child_id, date) => {
    return database.execute(
        "SELECT DISTINCT `longitude`, `latitude`, `timestamp` FROM `location_record` WHERE DATE(`timestamp`) = ? AND `child_id` = ? ORDER BY `timestamp` DESC LIMIT 48",
        [date, child_id]
    );
};

module.exports = { insertLocationRecord, insertLocationRecordBatch, selectLatestLocation, selectTodayLocationHistory, selectLocationHistoryByDate }