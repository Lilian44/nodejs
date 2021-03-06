const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');
const auth = require('../services/auth.services')


router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/me', auth, userController.getInfo);
router.post('/addInfo', auth, userController.createProfil)


module.exports = router;