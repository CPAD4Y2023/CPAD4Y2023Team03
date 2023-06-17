const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // farm: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Farm',
  //   unique: true,
  // },
});

userSchema.pre('save', async function(){
  try{
    var user = this;
    const salt = await(bcrypt.genSalt(10));
    const hashpass = await bcrypt.hash(user.password, salt);
    user.password = hashpass;
  }
  catch(error){
    throw error;

  }
})

userSchema.methods.comparePassword = async function(userPassword){
  try{
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  }
  catch(error){
    throw error;
  }
}




const User = mongoose.model('User', userSchema);

module.exports = User;