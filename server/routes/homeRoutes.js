const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Home = require("../models/Home");

// GET HOME DATA
router.get("/", async (req, res) => {
  try {
    const home = await Home.findOne();
    res.json(home);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE HOME DATA
router.put("/", authMiddleware, async (req, res) => {
  try {
    let home = await Home.findOne();

    if (!home) {
      home = await Home.create(req.body);
    } else {
      home = await Home.findByIdAndUpdate(
        home._id,
        req.body,
        { new: true }
      );
    }

    res.json(home);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;