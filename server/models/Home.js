const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  about: {
    type: String,
    required: true,
  },

  education: {
    type: String,
    required: true,
  },

  objective: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Home", homeSchema);