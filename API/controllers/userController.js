const User = require('../models/User');
const Farm = require('../models/Farm');
const jwt = require('jsonwebtoken');




 async function generateToken(tokenData, secretKey, jwt_expire){
  return jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire});

}

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
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check the password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }


    let tokenData = {_id:user._id,email:user.email};
    const token = await generateToken(tokenData, "secretzkey", '1h');
    // Return success message or token for further authentication
    res.status(200).json({ status: true, token: token, message: 'User Login Successfull' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' , message: error.message });
  }
}

module.exports = { registerUser, loginUser };