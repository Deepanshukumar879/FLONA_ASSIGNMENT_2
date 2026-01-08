// export function shouldInsertBroll(segment, index, lastInsertTime) {
//   if (segment.end_sec - segment.start_sec < 2) return false;
//   if (lastInsertTime !== null && segment.start_sec - lastInsertTime < 4) return false;
//   if (!segment.text || segment.text.length < 25) return false;
//   return true;
// }


export function shouldInsertBroll(segment) {
  if (segment.intent === "CONCLUSION") return false;
  if (segment.end_sec - segment.start_sec < 2) return false;
  if (!segment.text || segment.text.length < 25) return false;
  return true;
}
