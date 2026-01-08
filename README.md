🎬 Smart B-Roll Inserter (Backend System)

Smart B-Roll Inserter is a backend system that automatically plans B-roll insertions for a video based on a timestamped transcript (A-roll).
It focuses on semantic understanding, matching, and timeline planning, designed in a modular, production-oriented architecture.

This project demonstrates real-world backend engineering practices such as:

API design

modular services

rule-based planning logic

decoupling external dependencies

🧠 Problem Statement

Given a transcript of a video with timestamps, the system should:

Understand what is being said (A-roll)

Select appropriate B-roll visuals from a predefined library

Generate a structured timeline plan explaining:

which B-roll to insert

when to insert

why it was chosen

confidence and relevance score

🏗️ System Architecture (High Level)

The system is divided into independent phases so that progress is never blocked by external services.

Phase Breakdown

Phase 1 – A-roll Transcription (Optional)

Video → Audio (FFmpeg)

Audio → Timestamped transcript (OpenAI Whisper)

Implemented but execution depends on OpenAI billing

Phase 2 – B-roll Planning (Core, Fully Working)

Consumes structured transcript JSON

Matches transcript segments with B-roll metadata

Applies rule-based constraints

Outputs a detailed B-roll insertion timeline

Phase 3 – Video Rendering (Optional / Future)

Combine A-roll + B-roll using FFmpeg

👉 Phase 2 is fully functional and testable independently

🛠 Tech Stack

Node.js

Express.js

ES Modules

FFmpeg (Phase 1)

OpenAI Whisper (Phase 1 – optional)

JSON-based metadata

REST APIs



⚙️ Prerequisites

Make sure the following are installed:

Node.js (v18+ recommended)

npm

FFmpeg (only required for transcription phase)

Check:

node -v
npm -v
ffmpeg -version

🚀 How to Run the Backend
1️⃣ Clone the repository
git clone https://github.com/Deepanshukumar879/FLONA_ASSIGNMENT2.
cd phase1-transcription

2️⃣ Install dependencies
npm install

3️⃣ Start the server

npm run start


Expected output:

✅ Server running on port 3000


Backend will be available at:

http://localhost:3000

🔌 API Documentation
✅ POST /api/plan

Generates a B-roll insertion plan from a structured transcript.

📍 Endpoint
POST http://localhost:3000/api/plan

📥 Headers
Content-Type: application/json

📤 Request Body (Transcript Format)
{
  "segments": [
    {
      "start": 0,
      "end": 4,
      "text": "Daily exercise improves both mental and physical health"
    },
    {
      "start": 4,
      "end": 9,
      "text": "A balanced diet provides essential nutrients to the body"
    },
    {
      "start": 9,
      "end": 15,
      "text": "Consistent sleep patterns help maintain energy levels"
    }
  ]
}

Validation Rules

segments must be an array

Each segment must contain:

start (number)

end (number)

text (string)

Invalid input returns:

400 Bad Request

📥 Sample Response
{
  "insertions": [
    {
      "broll_id": "broll_5",
      "confidence": 0.95,
      "reason": "Visual selected based on semantic relevance",
      "moment_score": 0.38,
      "duration_sec": null
    }
  ]
}

🧪 How to Test Using Postman

Open Postman

Create a POST request

URL:

http://localhost:3000/api/plan


Set header:

Content-Type: application/json


Paste sample transcript JSON

Click Send

You should receive a structured B-roll plan.

🧠 Core Logic (Phase 2)
Matching Logic

Semantic comparison between transcript text and B-roll descriptions

Rule-based constraints:

Avoid opening seconds

Prevent repetitive B-roll usage

Maintain spacing between insertions

Timeline Planning

Orders insertions logically

Assigns confidence and moment scores

Outputs machine-readable JSON for rendering

⚠️ Current Limitations

B-roll diversity depends on available metadata

duration_sec is not auto-calculated yet

Transcription execution depends on OpenAI billing

Frontend exists but backend is fully testable without it

🔮 Future Improvements

Enable vector embeddings when billing is active

Cache embeddings for performance

Auto-calculate insertion duration from transcript

Improve B-roll diversity constraints

Add FFmpeg-based final video rendering

Harden frontend with better state management

📌 Notes for Reviewers

Phase 2 is intentionally decoupled from transcription

Backend can be fully evaluated using Postman

Architecture is modular and extensible

External dependency failure does not block core logic  <img width="1055" height="837" alt="image" src="https://github.com/user-attachments/assets/bb9dd04b-0664-4197-aae0-512caa1f50d3" />


👤 Author

Deepanshu Kumar
