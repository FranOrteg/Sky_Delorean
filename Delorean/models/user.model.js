// GET ALL USERS

const getUsers = () => {
    return db.query('SELECT * FROM labit_skylabdb1.people;')
};

const getStartEndDay = (UserID) => {
    return db.query(`SELECT * FROM labit_skylabdb1.startEndDay where user_id = ?;`, [UserID]);
};

module.exports = {
    getUsers,
    getStartEndDay
};