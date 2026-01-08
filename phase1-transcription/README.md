# Phase 1 – A-Roll Transcription with Timestamps

## Setup

1. Install dependencies
   npm install

2. Add OpenAI API key in `.env`

3. Start server
   npm run start

## API

POST /transcribe  
Form-data:
- video: mp4 file

## Response

Returns sentence-level transcript with timestamps
