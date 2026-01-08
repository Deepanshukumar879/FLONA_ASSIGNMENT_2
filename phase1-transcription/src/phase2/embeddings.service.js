export function getEmbedding(text) {
  const size = 10;
  const vector = new Array(size).fill(0);

  for (let i = 0; i < text.length; i++) {
    vector[i % size] += text.charCodeAt(i) % 10;
  }

  return vector;
}

