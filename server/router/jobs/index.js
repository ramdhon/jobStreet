const express = require('express');
const jobs = express.Router();

const JobController = require('../../controllers/jobController');


jobs.get('/:country/:page', JobController.getJobList);


module.exports = jobs;