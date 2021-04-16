const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookmarkLinkSchema = new Schema({
  bookmarkFolderId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("bookmark_links", bookmarkLinkSchema);
