const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookmarkLinkSchema = new Schema(
  {
    bookmarkFolderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('bookmark_links', bookmarkLinkSchema);
