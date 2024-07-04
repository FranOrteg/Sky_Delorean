const router = require('express').Router();

const { getUsers, getStartEndDayData, updateStartEndDay, insertStartEndDay } = require('../../models/user.model');

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
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const [data] = await getStartEndDayData(userId);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user data' });
    }
});

// UPDATE USER DATA
router.put('/startEndDay', async (req, res) => {
    try {
        const { id, start, end } = req.body;
        const [response] = await updateStartEndDay(id, start, end);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user data' });
    }
});

// INSERT START END DAY
router.post('/startEndDay', async (req, res) => {
    try {
        const { start, end, userId } = req.body;
        const [response] = await insertStartEndDay(start, end, userId);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting user data' });
    }
});


module.exports = router;