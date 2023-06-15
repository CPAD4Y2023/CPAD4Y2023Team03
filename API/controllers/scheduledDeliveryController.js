const ScheduledDelivery = require('../models/ScheduledDelivery');

// Create a scheduled delivery
async function createScheduledDelivery(req, res) {
  try {
    const { farmId, memberId, deliveryDate, vegetables } = req.body;

    // Create a new scheduled delivery
    const newScheduledDelivery = new ScheduledDelivery({ farm: farmId, member: memberId, deliveryDate, vegetables });
    await newScheduledDelivery.save();

    res.status(201).json({ message: 'Scheduled delivery created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create scheduled delivery' });
  }
}

// Get all scheduled deliveries for a specific farm
async function getAllScheduledDeliveries(req, res) {
  try {
    const { farmId } = req.params;
    const scheduledDeliveries = await ScheduledDelivery.find({ farm: farmId });
    res.status(200).json({ scheduledDeliveries });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get scheduled deliveries' });
  }
}

// Get all scheduled deliveries for a specific member
async function getScheduledDeliveriesForMember(req, res) {
  try {
    const { memberId } = req.params;
    const scheduledDeliveries = await ScheduledDelivery.find({ member: memberId });
    res.status(200).json({ scheduledDeliveries });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get scheduled deliveries for member' });
  }
}

module.exports = { createScheduledDelivery, getAllScheduledDeliveries, getScheduledDeliveriesForMember };