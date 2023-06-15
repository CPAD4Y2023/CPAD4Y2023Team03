const express = require('express')
const router = express.Router();
const scheduledDeliveryController = require('../controllers/scheduledDeliveryController');

router.post('/', scheduledDeliveryController.createScheduledDelivery);
router.get('/', scheduledDeliveryController.getAllScheduledDeliveries);
router.get('/:id', scheduledDeliveryController.getScheduledDeliveriesForMember);
module.exports = router;