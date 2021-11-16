import React, { useCallback, useEffect, useRef, useState } from "react";
import { WordComponent } from "../../components/word/Word";
import "./Playground.css";

export type PlayGroundProps = {
  onMiss(letter: string): void;
  hangmanWord: string;
};
export const Playground: React.FunctionComponent<PlayGroundProps> = ({ onMiss, hangmanWord }) => {
  const [foundLetters, setFoundLetters] = useState<Array<string>>(
    hangmanWord.split('').map((el, idx) => idx ? '' : el)
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (foundLetters.every((l) => !!l)) {
      alert("I won");
    }
  }, [foundLetters]);

  const handleClick = useCallback(() => {
    const input: HTMLInputElement = inputRef.current || new HTMLInputElement();
    const currentInput: string = input.value.toUpperCase();
    input.value = '';
    input.focus();

    if (foundLetters.includes(currentInput)) {
      return;
    }
    if (!hangmanWord.toUpperCase().includes(currentInput)) {
      onMiss(currentInput);
      return;
    }
    for (let i = 0; i < hangmanWord.length; i++) {
      if (hangmanWord[i].toUpperCase() === currentInput) {
        setFoundLetters((oldValue) => {
          oldValue[i] = currentInput;
          return [...oldValue];
        });
      }
    }
  }, [foundLetters, hangmanWord, onMiss]);

  return (
    <div>
      <WordComponent foundLetters={foundLetters} word={hangmanWord} />
      <input type="text" ref={inputRef} required minLength={1} maxLength={1} className="letter-input" />
      <button className="confirmation-btn" onClick={handleClick}>
        Confirm
      </button>
    </div>
  );
};
