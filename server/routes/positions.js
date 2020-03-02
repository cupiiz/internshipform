const express = require('express');
const positionsControllerDB = require('../controllers/positions');
// const isAuth = require('../middleware/is-auth');
const router = express.Router();

/**
 *  Manages Position
 *  Create At : 2/23/2020
 */

router.get('/position/get', positionsControllerDB.getPosition);
router.post('/position/create', positionsControllerDB.createPosition);
router.post('/position/edit', positionsControllerDB.updatePosition);
router.post('/position/delete', positionsControllerDB.deletePosition);

module.exports = router;