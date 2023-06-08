import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    const directions = [
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [-1, -1],
      [0, -1],
    ];
    let dx = 0;
    let dy = 0;
    let p = false;
    if (board[y][x] === 0) {
      for (const d of directions) {
        dx = d[1];
        dy = d[0];
        if (
          board[y + dy] !== undefined &&
          board[y + dy][x + dx] !== undefined &&
          board[y + dy][x + dx] === 3 - turnColor
        ) {
          for (let i = 1; i < 8; i++) {
            if (
              board[y + dy * i] !== undefined &&
              board[y + dy * i][x + dx * i] !== undefined &&
              board[y + dy * i][x + dx * i] === turnColor
            ) {
              let a = 0;
              for (let i2 = 1; i2 <= i; i2++) {
                if (board[y + dy * i2][x + dx * i2] !== 0) {
                  a++;
                }
              }
              if (a === i) {
                newBoard[y][x] = turnColor;
                p = true;
                for (let i2 = 1; i2 < i; i2++) {
                  newBoard[y + dy * i2][x + dx * i2] = turnColor;
                }
              }
              break;
            }
          }
        }
        if (p) {
          setTurnColor(3 - turnColor);
          setBoard(newBoard);
        }
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
