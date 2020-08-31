const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProblemSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  input_cond: { type: String, required: true },
  output_cond: { type: String, required: true },
  time_limit: { type: Number, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Problem', ProblemSchema);
