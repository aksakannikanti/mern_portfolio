const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const Resume = require("../models/Resume");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload Resume
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
  try {
    const resume = await Resume.create({
      filename: req.file.filename,
      filepath: req.file.path,
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Resume
router.get("/", async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ _id: -1 });
    res.json(resume);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;