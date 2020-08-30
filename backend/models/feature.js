const mongoose = require('mongoose');

const featureSchema = mongoose.Schema({
  title: { type: String, required: true },
});

module.exports = mongoose.model('Feature', featureSchema);
