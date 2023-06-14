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
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    let putStone = false; //石を置いたか判定する変数
    if (board[y][x] === 0) {
      //クリックした場所に石がないなら
      for (const [dy, dx] of directions) {
        //方向をひとつずつ、xとyに分けて取り出す
        if (
          board[y + dy] !== undefined &&
          board[y + dy][x + dx] !== undefined &&
          board[y + dy][x + dx] === 3 - turnColor //取り出した方向に相手の石があるなら
        ) {
          for (let i = 2; i < 8; i++) {
            //その方向を2~7倍するためのi
            if (
              board[y + dy * i] !== undefined &&
              board[y + dy * i][x + dx * i] !== undefined &&
              board[y + dy * i][x + dx * i] === turnColor //その方向のi倍の位置に自分の石があるなら
            ) {
              const count = 0; //石のある場所の数をカウントする変数

              for (let i2 = 2; i2 <= i; i2++) {
                //2から自分の石ある位置のiまで繰り返すi2
                if (board[y + dy * i2][x + dx * i2] !== 0) {
                  //方向のi2倍の位置に石があるなら
                  count;
                }
              }
              if (count === i) {
                newBoard[y][x] = turnColor;
                putStone = true;
                for (let i2 = 1; i2 < i; i2++) {
                  newBoard[y + dy * i2][x + dx * i2] = turnColor;
                }
              }
              break;
            }
          }
        }
      }
      if (putStone) {
        setTurnColor(3 - turnColor);
        setBoard(newBoard);
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
