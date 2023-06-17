const Farm = require('../models/Farm');
const User = require('../models/User');


async function createFarm(req, res) {
  try {
    // Extract the farm data from the request body
    const { farmName, farmSize, farmLocation, farmerId } = req.body;
  
    //Check if the farm with the same name already exists
    const existingFarm = await Farm.findOne({ $or: [{ farmName }, {farmerId}] });
    if(existingFarm) {
      return res.status(400).json({ error: 'Farm already exists' });
    }


    // Create a new instance of the Farm model
    const newFarm = new Farm({
      farmName,
      farmSize,
      farmLocation,
      farmerId
    });
  
    // Save the new farm to the database
    const savedFarm = await newFarm.save();
    
    // Return the saved farm as the response
    res.status(201).json({ message: 'Farm Add successfully', farm: savedFarm });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: 'Failed to Add farm' });
  } 
  }























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

module.exports = {createFarm, getAllFarms, getFarmById, updateFarm, deleteFarm };