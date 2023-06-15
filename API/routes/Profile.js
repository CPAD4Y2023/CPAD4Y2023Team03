const express = require('express')
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.getUserProfile);
router.put('/:id', profileController.updateUserProfile);

module.exports = router;