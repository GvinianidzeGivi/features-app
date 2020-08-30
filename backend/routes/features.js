const express = require('express');

const FeatureController = require('../controllers/features');
const checkAuth = require('../middleware/auth-checker');

const router = express.Router();

router.post('', checkAuth, FeatureController.createFeature);

router.put('/:id', checkAuth, FeatureController.updateFeature);

router.get('', FeatureController.getFeatures);

router.get('/:id', FeatureController.getFeature);

router.delete('/:id', checkAuth, FeatureController.deleteFeature);

module.exports = router;
