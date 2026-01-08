export function detectIntent(text) {
  const t = text.toLowerCase();

  if (
    t.includes("isliye") ||
    t.includes("important") ||
    t.includes("sabse") ||
    t.includes("long term")
  ) {
    return "CONCLUSION";
  }

  if (
    t.includes("khule") ||
    t.includes("dust") ||
    t.includes("pollution") ||
    t.includes("compromise") ||
    t.includes("nahi hota")
  ) {
    return "NEGATIVE_EXAMPLE";
  }

  if (
    t.includes("fresh") ||
    t.includes("clean") ||
    t.includes("healthy") ||
    t.includes("beneficial")
  ) {
    return "POSITIVE_RECOMMENDATION";
  }

  return "NEUTRAL_INFO";
}
