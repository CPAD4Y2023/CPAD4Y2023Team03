const express = require('express')
const router = express.Router();
const vegetableController = require('../controllers/vegetableController');

router.get('/', vegetableController.getAllVegetables);
router.get('/:id', vegetableController.getVegetableById);
router.post('/', vegetableController.addVegetable);
router.put('/:id', vegetableController.updatedVegetable);
router.delete('/:id', vegetableController.deleteVegetable);
module.exports = router;