// import { shouldInsertBroll } from "./rules.js";

// export function buildTimeline(matches) {
//   const insertions = [];
//   let lastInsertTime = null;

//   for (let i = 0; i < matches.length; i++) {
//     const { segment, broll, confidence } = matches[i];

//     if (!shouldInsertBroll(segment, i, lastInsertTime)) continue;
//     if (!broll || confidence < 0.45) continue;

//     insertions.push({
//       start_sec: segment.start_sec,
//       duration_sec: Math.min(3, segment.end_sec - segment.start_sec),
//       broll_id: broll.id,
//       confidence,
//       reason: `Visual context matches: ${segment.text}`
//     });

//     lastInsertTime = segment.start_sec;
//   }

//   return { insertions };
// }


import { shouldInsertBroll } from "./rules.js";
import { calculateMomentScore } from "../phase3/momentScore.service.js";

export function buildTimeline(matches) {
  const insertions = [];
  let lastInsertTime = null;

  for (let i = 0; i < matches.length; i++) {
    const { segment, broll, confidence } = matches[i];

    if (!shouldInsertBroll(segment)) continue;
    if (!broll) continue;

    const momentScore = calculateMomentScore(
      segment,
      confidence,
      lastInsertTime
    );

    if (momentScore < 0.25) continue;

    insertions.push({
      start_sec: segment.start_sec,
      duration_sec: Math.min(3, segment.end_sec - segment.start_sec),
      broll_id: broll.id,
      confidence,
      reason: buildReason(segment, broll),
      moment_score: momentScore
    });

    lastInsertTime = segment.start_sec;
  }

  return { insertions };
}

function buildReason(segment, broll) {
  if (segment.intent === "NEGATIVE_EXAMPLE") {
    return "Speaker highlights a problem; visual example reinforces the issue";
  }

  if (segment.intent === "POSITIVE_RECOMMENDATION") {
    return "Speaker recommends a good practice; visual helps demonstrate it";
  }

  return `Visual selected based on semantic relevance to "${broll.description}"`;
}
