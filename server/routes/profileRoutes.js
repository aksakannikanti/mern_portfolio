const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Profile = require("../models/Profile");

// Get All Profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add Profile
router.post("/", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Profile
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Profile
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);

    res.json({
      message: "Profile Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;