const express = require('express');
const mailtempControllerDB = require('../controllers/mailtemp');
// const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/mailtemp/get', mailtempControllerDB.getMailTemp);
router.post('/mailtemp/create', mailtempControllerDB.createMailTemp);
router.post('/mailtemp/edit', mailtempControllerDB.updateMailTemp);
router.post('/mailtemp/delete', mailtempControllerDB.deleteMailTemp);

module.exports = router;