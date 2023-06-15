const User = require('../models/User');
const Farm = require('../models/Farm');

// User Registration
async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if the user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', message: error.message });
  }
}

// User Login
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check the password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Return success message or token for further authentication
    res.status(200).json({ message: 'User login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' , message: error.message });
  }
}

module.exports = { registerUser, loginUser };