const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
});

module.exports = mongoose.model("Resume", resumeSchema);