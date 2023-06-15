const Member = require('../models/Member');


//Used by the farmer to get all the members
// Get all members of a specific farm
async function getAllMembers(req, res) {
  try {
    const { farmId } = req.params;
    const members = await Member.find({ farm: farmId });
    res.status(200).json({ members });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get members' });
  }
}

//Used by the members while choosing farm
// Add a new member to a specific farm
async function addMember(req, res) {
  try {
    const { farmId } = req.params;
    const { name, email, phoneNumber, address } = req.body;

    // Create a new member
    const newMember = new Member({ farm: farmId, name, email, phoneNumber, address });
    await newMember.save();

    res.status(201).json({ message: 'Member added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add member' });
  }
}


// Remove a specific member from a farm
async function removeMember(req, res) {
  try {
    const { farmId, memberId } = req.params;

    // Find the member and remove it
    await Member.findOneAndRemove({ _id: memberId, farm: farmId });

    res.status(200).json({ message: 'Member removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove member' });
  }
}

module.exports = { getAllMembers, addMember, removeMember };