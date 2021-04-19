const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  status: {
    type: String,
    default: 'ACTIVE', // ACTIVE | INACTIVE
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('categories', categorySchema);
