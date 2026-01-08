import { getEmbedding } from "./embeddings.service.js";

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function matchSegmentsToBroll(segments, brolls) {
  const brollEmbeddings = brolls.map(b => ({
    ...b,
    embedding: getEmbedding(b.description)
  }));

  return segments.map(segment => {
    const segEmbedding = getEmbedding(segment.text);

    let bestMatch = null;
    let bestScore = 0;

    for (const broll of brollEmbeddings) {
      const score = cosineSimilarity(segEmbedding, broll.embedding);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = broll;
      }
    }

    return {
      segment,
      broll: bestMatch,
      confidence: Number(bestScore.toFixed(2))
    };
  });
}
