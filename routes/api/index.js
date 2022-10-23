// pull and create base routes for users and thoughts
const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const thoughtRoutes = require('./thoughtRoutes');


router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;