export default function TranscriptInput({ value, onChange }) {
  return (
    <textarea
      rows={10}
      placeholder="Paste transcript JSON here"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
