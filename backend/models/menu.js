const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  title: { type: String, required: true },
});

module.exports = mongoose.model('Menu', menuSchema);
