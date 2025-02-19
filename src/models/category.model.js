const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

CategorySchema.index({ name: 1 });

module.exports = mongoose.model('Category', CategorySchema);
