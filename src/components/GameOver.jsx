export default function GameOver({ winner, onReset }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      <p>
        {winner === "Draw" ? "It's a Draw!" : `${winner.toUpperCase()} Won!`}
      </p>
      <button onClick={onReset}>Play Again</button>
    </div>
  );
}
