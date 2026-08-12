const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Skill = require("../models/Skill");

router.get("/", async (req, res) => {
  try {
    const skills = await Skill.findOne();
    res.json(skills);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    let skills = await Skill.findOne();

    if (!skills) {
      skills = new Skill(req.body);
    } else {
      skills.skills = req.body.skills;
    }

    await skills.save();

    res.json(skills);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;