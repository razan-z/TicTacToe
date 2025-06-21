export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn, index) => (
        <li key={index}>
          {turn.player} selected {turn.square.row + 1}, {turn.square.cell + 1}
        </li>
      ))}
    </ol>
  );
}
