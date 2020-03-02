const express = require('express');
const universitiesControllerDB = require('../controllers/universities');
// const isAuth = require('../middleware/is-auth');
const router = express.Router();
/**
 *  Manages universities
 *  Create At : 3/02/2020
 */
router.get('/universities/get', universitiesControllerDB.getUniversities);


module.exports = router;