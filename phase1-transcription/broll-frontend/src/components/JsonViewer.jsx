export default function JsonViewer({ data }) {
  return (
    <div>
      <h2>Raw Output</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
