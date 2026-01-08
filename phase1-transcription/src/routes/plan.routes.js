import express from "express";
import brolls from "../data/brollMetadata.json" assert { type: "json" };
import { matchSegmentsToBroll } from "../phase2/matching.service.js";
import { buildTimeline } from "../phase2/timeline.service.js";

const router = express.Router();

router.post("/plan", (req, res) => {
  try {
    const transcript = req.body;

    if (!transcript || !Array.isArray(transcript.segments)) {
      return res.status(400).json({ error: "Invalid transcript input" });
    }

    const matches = matchSegmentsToBroll(transcript.segments, brolls);
    const timeline = buildTimeline(matches);

    res.json(timeline);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Plan generation failed" });
  }
});

export default router;
