const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId, // foreign key
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notes", NotesSchema);