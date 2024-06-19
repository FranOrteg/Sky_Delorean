const router = require('express').Router();


router.use('/user', require('./api/user'));


module.exports = router;