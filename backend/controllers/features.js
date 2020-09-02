const Feature = require('../models/feature');

exports.createFeature = (req, res, next) => {
  const feature = new Feature({
    title: req.body.title,
  });
  console.log(feature);
  feature
    .save()
    .then(createdFeature => {
      res.status(201).json({
        message: 'Feature added successfully!',
        feature: {
          id: createdFeature._id
        }
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: 'Creating a feature failed!'
      });
    });
}

exports.updateFeature = (req, res, next) => {
  const feature = new Feature({
    _id: req.body.id,
    title: req.body.title,
  });
  Feature.updateOne({ _id: req.params.id}, feature)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      return res.status(500).json({
        message: "Couldn't update feature!"
      });
    });
}

exports.getFeatures = (req, res, next) => {
  const featureQuery = Feature.find();
  let fetchedFeatures;
  featureQuery
    .then(documents => {
      fetchedFeatures = documents;
    })
    .then(count => {
      res.status(200).json({
        message: 'Features fetched successfully!',
        features: fetchedFeatures,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: 'Fetching features failed!'
      });
    });
}

exports.getFeature = (req, res, next) => {
  Feature.findById(req.params.id)
    .then(feature => {
      if (feature) {
        res.status(200).json(feature);
      } else {
        res.status(404).json({ message: 'Feature not found!' });
      }
    })
    .catch(error => {
      return res.status(500).json({
        message: 'Fetching feature failed!'
      });
    });
}

exports.deleteFeature = (req, res, next) => {
  Feature.deleteOne({ _id: req.params.id})
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Feature deleted!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      return res.status(500).json({
        message: 'Fetching features failed!'
      });
    });
}
