import { useState } from "react";
import { generatePlan } from "./api";
import TranscriptInput from "./components/TranscriptInput";
import Timeline from "./components/Timeline";
import InsertionList from "./components/InsertionList";
import JsonViewer from "./components/JsonViewer";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    try {
      setError("");
      setLoading(true);
      const data = await generatePlan(JSON.parse(input));
      setResult(data);
    } catch {
      setError("Invalid JSON or backend not reachable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>Smart B-Roll Planner</h1>

      <TranscriptInput value={input} onChange={setInput} />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <>
          <Timeline insertions={result.insertions} />
          <InsertionList insertions={result.insertions} />
          <JsonViewer data={result} />
        </>
      )}
    </div>
  );
}
