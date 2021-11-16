import React from "react";
import "./Word.css";

type WordComponentProps = {
  word: string;
  foundLetters: Array<string>;
};

export const WordComponent: React.FunctionComponent<WordComponentProps> = ({
  word,
  foundLetters,
}) => (
  <div className="word-container">
    {word.split('').map((el, idx) => (
      <div className="word-underscore" key={`${el}_${idx}`}>
        {foundLetters[idx]}
      </div>
    ))}
  </div>
);
