import Player from "./components/Player";
function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialPlayerName="Player 1" playerSymbol="X" />
          <Player initialPlayerName="Player 2" playerSymbol="O" />
        </ol>
      </div>
    </main>
  );
}

export default App;
