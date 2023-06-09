const express = require('express')
const router = express.Router();
const memberController = require('../controllers/memberController');

router.post('/', memberController.addMember);
router.get('/', memberController.getAllMembers);
router.delete('/:id', memberController.removeMember);

module.exports = router;