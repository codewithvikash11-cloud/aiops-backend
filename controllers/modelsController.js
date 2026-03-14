const Model = require('../models/Model');
const { calculateTokenCost } = require('../utils/costCalculator');

// @desc    Get all models
// @route   GET /api/models
// @access  Public
const getModels = async (req, res) => {
  try {
    const models = await Model.find({});
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single model
// @route   GET /api/models/:id
// @access  Public
const getModel = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (model) {
      res.status(200).json(model);
    } else {
      res.status(404).json({ message: 'Model not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Calculate cost
// @route   POST /api/calculate-cost
// @access  Public
const calculateCost = async (req, res) => {
  try {
    const { model_id, input_tokens, output_tokens } = req.body;

    if (!model_id || input_tokens === undefined || output_tokens === undefined) {
      return res.status(400).json({ message: 'Please provide model_id, input_tokens, and output_tokens' });
    }

    const model = await Model.findById(model_id);

    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }

    const cost = calculateTokenCost(input_tokens, output_tokens, model.input_price, model.output_price);

    res.status(200).json({ cost });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getModels,
  getModel,
  calculateCost,
};
