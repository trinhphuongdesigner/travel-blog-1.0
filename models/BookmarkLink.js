const mongoose = require('mongoose');
const { Schema } = mongoose;


const bookmarkLinkSchema = new Schema({
  bookmarkFolderId: Schema.Types.ObjectId,
  postId: Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('bookmark_links', bookmarkLinkSchema);
