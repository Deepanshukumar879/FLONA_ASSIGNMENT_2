export default function InsertionList({ insertions }) {
  return (
    <div>
      <h2>B-Roll Insertions</h2>
      {insertions.map((i, idx) => (
        <div key={idx} className="card">
          <p><b>Clip:</b> {i.broll_id}</p>
          <p><b>Confidence:</b> {i.confidence}</p>
          <p><b>Moment Score:</b> {i.moment_score}</p>
          <p><b>Reason:</b> {i.reason}</p>
        </div>
      ))}
    </div>
  );
}
