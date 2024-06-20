const router = require('express').Router();

const { getUsers, getStartEndDay } = require('../../models/user.model');

// GET USER

router.get('/', async (req, res) => {
    try {
        const [users] = await getUsers();
        res.json(users);
    } catch (error) {
        res.json({ error: error.message});
    }
});

// GET USER BY ID
router.get('/:Id', async (req, res) => {
    const { Id } = req.params
    try {
        const [user] = await getStartEndDay(Id)
        res.json(user)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});


module.exports = router;