const API_BASE = "http://localhost:3000";

export async function generatePlan(transcript) {
  const res = await fetch(`${API_BASE}/api/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transcript)
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.json();
}
