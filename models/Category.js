const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  status: {
    type: String,
    default: "ACTIVE", // ACTIVE | INACTIVE
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updateAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("categories", categorySchema);
