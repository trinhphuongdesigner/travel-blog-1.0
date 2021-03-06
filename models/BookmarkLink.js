const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookmarkLinkSchema = new Schema({
  bookmarkFolderId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'bookmark_folders',
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'posts',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('bookmark_links', bookmarkLinkSchema);
