const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'basic',
    enum: ["basic", "supervisor", "admin"]
  },
  results: [{
    problem_id: String,
    best_time: Number,
    avg_time: Number,
    st_deviation: Number,
    percentage: Number,
  }],
});

module.exports = mongoose.model('User', UserSchema);
