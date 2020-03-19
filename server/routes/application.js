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
router.post('/application/edit', applicationControllerDB.updateApplication);
router.post('/application/delete', applicationControllerDB.deleteApplication);

module.exports = router;