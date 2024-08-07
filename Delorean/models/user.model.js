// GET ALL USERS

const getUsers = () => {
    return db.query('SELECT * FROM labit_skylabdb1.people where Notes = "Del";')
};

const getStartEndDayData = (UserID) => {
    return db.query(`SELECT * FROM labit_skylabdb1.startEndDay where user_id = ?;`, [UserID]);
};

const updateStartEndDay = (id, StartDate, EndDate) => {
    return db.query('UPDATE labit_skylabdb1.startEndDay SET start = ?, end = ? WHERE id = ?', [StartDate, EndDate, id]);
};

const insertStartEndDay = (start, end, userID) => {
    return db.query('INSERT INTO labit_skylabdb1.startEndDay (start, end, user_id) VALUES (?, ?, ?)', [start, end, userID]);
}

module.exports = {
    getUsers,
    getStartEndDayData,
    updateStartEndDay,
    insertStartEndDay
};