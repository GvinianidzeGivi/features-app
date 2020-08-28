const express = require('express');
const Feature = require('../models/feature');

const router = express.Router();

router.post('', (req, res, next) => {
  const feature = new Feature({
    title: req.body.title,
  });
  feature.save().then(createdFeature => {
    res.status(201).json({
      message: 'Feature added successfully',
      featureId: createdFeature._id
    });
  });
});

router.put('/:id', (req, res, next) => {
  const feature = new Feature({
    title: req.body.title,
  });
  Feature.updateOne({ _id: req.params.id }, feature).then(result => {
    res.status(200).json({ message: 'Update successful!' });
  });
});

router.get('', (req, res, next) => {
  Feature.find().then(documents => {
    res.status(200).json({
      message: 'Features fetched successfully!',
      features: documents
    });
  });
});

router.get('/:id', (req, res, next) => {
  Feature.findById(req.params.id).then(feature => {
    if (feature) {
      res.status(200).json(feature);
    } else {
      res.status(404).json({ message: 'Feature not found!' });
    }
  });
});

router.delete('/:id', (req, res, next) => {
  Feature.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'Feature deleted!' });
  });
});

module.exports = router;
