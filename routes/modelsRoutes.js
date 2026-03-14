const express = require('express');
const router = express.Router();
const { getModels, getModel, calculateCost } = require('../controllers/modelsController');

router.get('/models', getModels);
router.get('/models/:id', getModel);
router.post('/calculate-cost', calculateCost);

module.exports = router;
