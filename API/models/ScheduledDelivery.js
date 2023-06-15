const mongoose = require('mongoose');

const scheduledDeliverySchema = new mongoose.Schema({
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true,
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  vegetables: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vegetable',
    required: true,
  }],
});

const ScheduledDelivery = mongoose.model('ScheduledDelivery', scheduledDeliverySchema);

module.exports = ScheduledDelivery;