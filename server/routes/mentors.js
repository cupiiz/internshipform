const express = require('express');
const mentorsControllerDB = require('../controllers/mentors');
// const isAuth = require('../middleware/is-auth');
const router = express.Router();

/**
 *  Manages mentor
 *  Create At : 3/18/2020
 */

router.get('/mentors/get', mentorsControllerDB.getMentors);
router.post('/mentors/create', mentorsControllerDB.createMentors);
router.post('/mentors/edit', mentorsControllerDB.updateMentors);
router.post('/mentors/delete', mentorsControllerDB.deleteMentors);

module.exports = router;