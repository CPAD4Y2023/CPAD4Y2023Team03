const express = require('express')
const router = express.Router();
const farmController = require('../controllers/farmController');

router.get('/', farmController.getAllFarms);
router.get('/:id', farmController.getFarmById);
router.post('/addfarm', farmController.createFarm);
router.put('/:id', farmController.updateFarm);
router.delete('/:id', farmController.deleteFarm);
module.exports = router;