const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const {
  getProperties,
  deleteProperty,
} = require("../controllers/property.controller");

// OBTENER
router.get("/", getProperties);

// CREAR CON IMÁGENES (INTEGRADO)
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "properties" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    });

    const images = await Promise.all(uploadPromises);

    const Property = require("../models/Property");

    const newProperty = await Property.create({
      ...req.body,
      images,
    });

    res.json(newProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", deleteProperty);

module.exports = router;