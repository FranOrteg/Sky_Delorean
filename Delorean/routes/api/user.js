const router = require('express').Router();

const { getUsers } = require('../../models/user.model');

// GET USER

router.get('/', async (req, res) => {
    try {
        const [users] = await getUsers();
        res.json(users);
    } catch (error) {
        res.json({ error: error.message});
    }
})


module.exports = router;