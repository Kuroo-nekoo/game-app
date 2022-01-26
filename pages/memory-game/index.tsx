import { config } from "process";
import * as React from "react";

const MemoryGame = () => {
  const [error, setError] = React.useState<string>("");
  const [level, setLevel] = React.useState<number>(1);
  const [res, setRes] = React.useState<number[]>([]);
  const firstCellRef = React.useRef<HTMLDivElement>(null);
  let userChoices: number[] = [];
  let i = 0;

  React.useEffect(() => {
    const temp = [];
    for (let i = 0; i < level; i++) {
      temp.push(Math.floor(Math.random() * 4) + 1);
      setRes(temp);
    }
  }, [level]);

  const handleStartClick = () => {
    const temp = setInterval(() => {
      if (i < res.length) {
        const cell = document.querySelector("#cell" + res[i]);
        cell!.style.color = "red";
        i++;
      }
      if (i == res.length) {
        clearInterval(temp);
        for (let j = 1; j < 5; j++) {
          document.querySelector(`#cell${j}`)!.style.color = "black";
        }
      }
    }, 1000);
  };

  return (
    <div>
      {[1, 2, 3, 4].map((num) => {
        return (
          <div
            key={num}
            id={`cell${num}`}
            onClick={() => {
              userChoices.push(num);
              console.log(res, userChoices);
              if (
                userChoices[userChoices.length - 1] !==
                res[userChoices.length - 1]
              ) {
                setError("You lost");
              }
              if (userChoices.length === res.length && error === "") {
                setLevel(level + 1);
              }
            }}
          >
            {num}
          </div>
        );
      })}
      {error && <div>{error}</div>}
      <button
        onClick={() => {
          handleStartClick();
        }}
      >
        play
      </button>
    </div>
  );
};

export default MemoryGame;
