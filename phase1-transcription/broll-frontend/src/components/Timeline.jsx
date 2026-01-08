export default function Timeline({ insertions }) {
  return (
    <div className="timeline">
      <h2>Timeline</h2>
      {insertions.map((i, idx) => (
        <div key={idx} className="timeline-item">
          {i.start_sec}s – {i.start_sec + i.duration_sec}s → {i.broll_id}
        </div>
      ))}
    </div>
  );
}
