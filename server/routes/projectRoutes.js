const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Project = require("../models/project");

// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();

    res.json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD PROJECT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE PROJECT
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE PROJECT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Project Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;