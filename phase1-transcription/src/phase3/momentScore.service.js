export function calculateMomentScore(segment, confidence, lastInsertTime) {
  let score = 0;

  if (segment.intent === "NEGATIVE_EXAMPLE") score += 0.4;
  if (segment.intent === "POSITIVE_RECOMMENDATION") score += 0.4;
  if (segment.intent === "NEUTRAL_INFO") score += 0.2;

  score += confidence * 0.4;

  if (segment.intent === "CONCLUSION") score -= 0.6;

  if (lastInsertTime !== null && segment.start_sec - lastInsertTime < 5) {
    score -= 0.3;
  }

  return Number(score.toFixed(2));
}

