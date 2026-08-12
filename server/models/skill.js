const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  skills: [String],
});

module.exports = mongoose.model("Skill", skillSchema);