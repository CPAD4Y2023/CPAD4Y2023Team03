const Profile = require('../models/Profile');

// Get user profile
async function getUserProfile(req, res) {
  try {
    const { userId } = req.params;

    // Find the user profile by userId
    const userProfile = await Profile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json({ profile: userProfile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
}

// Update user profile
async function updateUserProfile(req, res) {
  try {
    const { userId } = req.params;
    const { name, age, location } = req.body;

    // Find the user profile by userId
    const userProfile = await Profile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Update the user profile
    userProfile.name = name;
    userProfile.age = age;
    userProfile.location = location;

    await userProfile.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user profile' });
  }
}

module.exports = { getUserProfile, updateUserProfile };