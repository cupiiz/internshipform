const express = require('express');
const authControllerDB = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const router = express.Router();


router.post('/admin/signup', authControllerDB.adminSignup );
router.post('/admin/login', authControllerDB.adminLogin );
router.get('/admin/select', isAuth, authControllerDB.getAdmin );


module.exports = router;