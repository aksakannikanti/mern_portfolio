const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Certificate = require("../models/certificate");

// GET ALL CERTIFICATES
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD CERTIFICATE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const certificate = await Certificate.create(
      req.body
    );

    res.json(certificate);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE CERTIFICATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const certificate =
      await Certificate.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(certificate);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE CERTIFICATE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Certificate Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;