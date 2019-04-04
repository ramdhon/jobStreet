const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/home.js');


router.get('/', HomeController.home);

//router uses will be put down here...



//---


module.exports = router;