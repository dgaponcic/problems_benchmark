const mongoose = require('mongoose');

const { Schema } = mongoose;

const TestSchema = new Schema({
  problem: {
    type: String,
    required: true,
  },
  input: { type: String, required: true },
  output: { type: String, required: true },
});

module.exports = mongoose.model('Test', TestSchema);
