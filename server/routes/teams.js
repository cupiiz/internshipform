const express = require('express');
const teamControllerDB = require('../controllers/teams');
// const isAuth = require('../middleware/is-auth');
const router = express.Router();
/**
 *  Manages Teams
 *  Create At : 2/23/2020
 */
router.get('/team/get', teamControllerDB.getTeam);
router.post('/team/create', teamControllerDB.createTeam);
router.post('/team/edit', teamControllerDB.updateTeam);
router.post('/team/delete', teamControllerDB.deleteTeam);

module.exports = router;