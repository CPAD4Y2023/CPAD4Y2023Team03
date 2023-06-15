const Farm = require('../models/Farm');

// Get all farms
async function getAllFarms(req, res) {
  try {
    const farms = await Farm.find();
    res.status(200).json({ farms });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get farms' });
  }
}

// Get a specific farm by ID
async function getFarmById(req, res) {
  try {
    const { farmId } = req.params;
    const farm = await Farm.findById(farmId);
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }
    res.status(200).json({ farm });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get farm' });
  }
}

// Create a new farm
async function createFarm(req, res) {
  try {
    const { name, landSize, ownerId } = req.body;

    // Create a new farm
    const newFarm = new Farm({ name, landSize, owner: ownerId });
    await newFarm.save();

    res.status(201).json({ message: 'Farm created successfully', farm: newFarm });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create farm' });
  }
}

// Update a specific farm by ID
async function updateFarm(req, res) {
  try {
    const { farmId } = req.params;
    const { name, landSize } = req.body;

    // Find the farm and update its details
    const farm = await Farm.findByIdAndUpdate(farmId, { name, landSize }, { new: true });
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }

    res.status(200).json({ message: 'Farm updated successfully', farm });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update farm' });
  }
}

// Delete a specific farm by ID
async function deleteFarm(req, res) {
  try {
    const { farmId } = req.params;

    // Find the farm and remove it
    const deletedFarm = await Farm.findByIdAndRemove(farmId);
    if (!deletedFarm) {
      return res.status(404).json({ error: 'Farm not found' });
    }

    res.status(200).json({ message: 'Farm deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete farm' });
  }
}

module.exports = { getAllFarms, getFarmById, createFarm, updateFarm, deleteFarm };