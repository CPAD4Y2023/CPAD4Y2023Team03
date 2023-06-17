const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  farmName: {
    type: String,
    required: true,
    unique:true,
  },
  farmSize: {
    type: Number,
    required: true,
  },
  farmLocation:{
    type: String,
    required: true,
  },
  
  farmerId: {
    type: String,
    required: true,
  },
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
