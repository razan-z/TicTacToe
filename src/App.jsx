import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length % 2 === 1) {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, cell } = square;
    gameBoard[row][cell] = player;
  }

  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    if (firstSquareSymbol === null) continue;
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    if (secondSquareSymbol !== firstSquareSymbol) continue;
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];
    if (thirdSquareSymbol !== firstSquareSymbol) continue;
    // We have a winner!
    winner = players[firstSquareSymbol];
    break;
  }

  // Check for a draw
  if (gameTurns.length === 9 && !winner) {
    winner = "Draw";
  }

  function handleSelectSquare(rowIndex, cellIndex) {
    // Update the game turns with the current player's move
    setGameTurns((prevTurns) => {
      const curentPlayer = deriveActivePlayer(prevTurns);
      // Update the game board with the current player's move
      const updatedTurns = [
        { square: { row: rowIndex, cell: cellIndex }, player: curentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleReset() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [playerSymbol]: newName,
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialPlayerName="Player 1"
            playerSymbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialPlayerName="Player 2"
            playerSymbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {winner && <GameOver winner={winner} onReset={handleReset} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
