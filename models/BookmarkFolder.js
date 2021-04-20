const mongoose = require('mongoose');

const getSlug = require('speakingurl');

const { Schema } = mongoose;

const bookmarkFolderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
    unique: true,
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
bookmarkFolderSchema.pre('save', function (next) {
  const bookmarkFolder = this;

  if (!bookmarkFolder.isModified('title')) return next();

  const slug = getSlug(bookmarkFolder.title, {
    lang: 'vn',
  });

  bookmarkFolder.slug = slug;

  next();
});

module.exports = mongoose.model('bookmark_folders', bookmarkFolderSchema);
