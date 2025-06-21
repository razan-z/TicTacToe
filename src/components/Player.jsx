import { useState } from "react";

export default function Player({
  initialPlayerName,
  playerSymbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialPlayerName);

  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(playerSymbol, playerName);
    }
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        value={playerName}
        onChange={handleNameChange}
        onBlur={handleEditClick}
        required
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{playerSymbol}</span>
      </span>
      <button onClick={handleEditClick} onBlur={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
