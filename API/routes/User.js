const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.loginUser);
router.post('/register', userController.registerUser);

module.exports = router;