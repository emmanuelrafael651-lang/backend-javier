const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// SUBIR MÚLTIPLES IMÁGENES
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

    const urls = await Promise.all(uploadPromises);

    res.json({
      success: true,
      images: urls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;