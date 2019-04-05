const express = require('express');
const router = express.Router();
const userRoutes = require('./user')
const jobRoutes = require('./jobs');

const HomeController = require('../controllers/home.js');
const UserController = require('../controllers/userController');


router.get('/', HomeController.home);
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);

//router uses will be put down here...



//---


module.exports = router;