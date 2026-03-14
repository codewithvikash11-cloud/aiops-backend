const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  input_price: {
    type: Number,
    required: true,
  },
  output_price: {
    type: Number,
    required: true,
  },
  context_length: {
    type: Number,
    required: true,
  },
  latency: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
