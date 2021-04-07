const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookmarkFolderSchema = new Schema({
  userId: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("bookmarkfolders", bookmarkFolderSchema);
