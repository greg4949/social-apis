const router = require('express').Router();
const courseRoutes = require('./thoughtRoutes.js');
const studentRoutes = require('./userRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;