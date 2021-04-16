const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookmarkFolderSchema = new Schema({
  userId: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("bookmark_folders", bookmarkFolderSchema);
