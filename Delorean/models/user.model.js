// GET ALL USERS

const getUsers = () => {
    return db.query('SELECT * FROM labit_skylabdb1.people;')
};

module.exports = {
    getUsers
};