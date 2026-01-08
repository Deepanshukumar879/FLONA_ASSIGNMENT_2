import express from "express";
import multer from "multer";
import { transcribeVideo } from "../services/transcribe.service.js";
import { cleanupFile } from "../utils/fileCleanup.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Video file is required" });
    }

    const transcript = await transcribeVideo(req.file.path);
    res.json({ success: true, transcript });

  } catch (err) {
    console.error("❌ Route error:", err.message);
    res.status(500).json({
      error: "Transcription failed",
      details: err.message
    });
  } finally {
    // ✅ cleanup original uploaded file
    if (req.file?.path) {
      cleanupFile(req.file.path);
    }
  }
});

export default router;
