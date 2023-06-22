import { useState } from 'react';
import { Cell } from '../components/Cell';
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
        //方向をひとつずつ dy と dx に分けて取り出す
        if (
          board[y + dy] !== undefined &&
          board[y + dy][x + dx] !== undefined &&
          board[y + dy][x + dx] === 3 - turnColor //取り出した方向に相手の石があるなら
        ) {
          for (let i = 1; i < 8; i++) {
            //その方向を1~7倍するためのi
            if (
              board[y + dy * i] !== undefined &&
              board[y + dy * i][x + dx * i] !== undefined &&
              board[y + dy * i][x + dx * i] === turnColor //その方向のi倍の位置に自分の石があるなら
            ) {
              let count = 0; //石のある場所の数をカウントする変数

              for (let i2 = 1; i2 <= i; i2++) {
                //1から自分の石ある位置のiまで繰り返すi2
                if (board[y + dy * i2][x + dx * i2] !== 0) {
                  //方向のi2倍の位置に石があるなら
                  count++;
                }
              }
              if (count === i) {
                //countが自分の石がある位置までの石の数と等しいなら
                newBoard[y][x] = turnColor; //クリックした位置に石を置く
                putStone = true; //石を置いたのでtrue
                for (let i3 = 1; i3 < i; i3++) {
                  //はさんでいる部分を示すi3
                  newBoard[y + dy * i3][x + dx * i3] = turnColor; //はさんでいる相手の石を自分の石に変える
                }
              }
              break; //今の方向は石を置き終わったので for (let i = 1; i < 8; i++) を break し次の方向へ
            }
          }
        }
      }
      if (putStone) {
        //すべての方向に対して繰り返しが終わったとき、石を置いているなら
        setTurnColor(3 - turnColor);
        setBoard(newBoard); //ターンを変える
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell key={`${x}-${y}`} color={color} onClick={() => onClick(x, y)} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
