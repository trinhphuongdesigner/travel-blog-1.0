const mongoose = require('mongoose');

const getSlug = require('speakingurl');

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
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

// eslint-disable-next-line func-names
categorySchema.pre('save', function (next) {
  const category = this;

  if (!category.isModified('name')) return next();

  const slug = getSlug(category.name, {
    lang: 'vn',
  });

  category.slug = slug;

  next();
});

module.exports = mongoose.model('categories', categorySchema);
