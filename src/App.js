import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [matrix, setMatrix] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [won, setWon] = useState(null);

  console.log("matrix ", matrix);

  const resetGame = () => {
    setMatrix(Array(9).fill(null));
    setWon(null);
    setIsXTurn(true);
  };

  const handleUserClick = (e) => {
    const pos = e.target.id;
    const copyMatrix = [...matrix];
    console.log("positionposition ", pos);
    copyMatrix[pos] = isXTurn ? "X" : "O";
    setMatrix(copyMatrix);
    setIsXTurn((prevTurn) => !prevTurn);
  };

  const decideWinner = () => {
    //Winner Chance

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (matrix[a] && matrix[a] === matrix[b] && matrix[a] === matrix[c]) {
        setWon(matrix[b]);
      }
    }
  };

  useEffect(() => {
    decideWinner();
  }, [matrix]);

  return (
    <div className="App">
      <h1>Tic Toc Toe</h1>

      <div className="board" onClick={handleUserClick}>
        {matrix.map((item, index) => (
          <div key={index} id={index} className="box">
            {item}
          </div>
        ))}
      </div>

      <div className="game-info">
        <button onClick={resetGame}>Reset</button>
        <div>Next Player: {isXTurn ? "X" : "O"}</div>
        {won && <div>Player {won} won the game</div>}
      </div>
    </div>
  );
}
