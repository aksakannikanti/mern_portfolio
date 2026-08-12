const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);