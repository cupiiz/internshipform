const express = require('express');
const applicationControllerDB = require('../controllers/application');
// const isAuth = require('../middleware/is-auth');
const router = express.Router();

/**
 *  Manages Application
 *  Create At : 2/23/2020
 */

router.get('/application/get', applicationControllerDB.getApplication);
router.post('/application/create', applicationControllerDB.createApplication);

router.post('/application/delete', applicationControllerDB.deleteApplication);
router.post('/application/statuschange', applicationControllerDB.statusChange);
router.get('/application/getapproved', applicationControllerDB.getApprovedApplication);
router.post('/application/addmentors', applicationControllerDB.AddMentors);
router.get('/application/getdecline', applicationControllerDB.getDeclineApplication);
module.exports = router;