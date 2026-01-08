import express from "express";
import dotenv from "dotenv";
import transcribeRouter from "./routes/transcribe.routes.js";
import planRouter from "./routes/plan.routes.js";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY missing in environment");
  process.exit(1);
}

const app = express();

app.use(express.json());

// Phase 1
app.use("/transcribe", transcribeRouter);

// Phase 2
app.use("/api", planRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

