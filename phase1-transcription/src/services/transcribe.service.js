import fs from "fs";
import { execSync } from "child_process";
import OpenAI from "openai";

export async function transcribeVideo(videoPath) {
    console.log("🔑 OPENAI_API_KEY present:", !!process.env.OPENAI_API_KEY);
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY missing");
  }

  // ✅ FIX 1: audio path (NO extension assumption)
  const audioPath = `${videoPath}.mp3`;

  try {
    // ✅ FIX 2: ffmpeg errors visible
    execSync(
      `ffmpeg -y -i "${videoPath}" -vn -acodec libmp3lame -ar 16000 -ac 1 "${audioPath}"`,
      { stdio: "pipe" }
    );

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 180000
    });

    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-1",
      response_format: "verbose_json"
    });

    return response.segments.map(segment => ({
      start_sec: Number(segment.start.toFixed(2)),
      end_sec: Number(segment.end.toFixed(2)),
      text: segment.text.trim()
    }));

  } finally {
    // ✅ FIX 3: cleanup in finally
    if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
  }
}
