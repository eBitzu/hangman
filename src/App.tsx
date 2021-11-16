import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import { Playground } from "./library";
import * as randomWord from 'random-words';
import { Misses } from "./library/components";

const getWord = (): string => randomWord({minLength: 5, exactly: 1})[0].toUpperCase();

const App: React.FC = () => {
  const [lives, setLives] = useState(5);
  const [word, setWord] = useState<string>(getWord());
  const [misses, setMisses] = useState<Array<string>>([]);

  const handleMisses = useCallback((letter) => {
    setLives((oldValues: number) => (oldValues ? --oldValues : 0));
    setMisses((oldMiss) => [...oldMiss, letter]);
  }, []);

  const reset = () => {
    setLives(5);
    setMisses([]);
    setWord(getWord());
  };

  useEffect(() => {
    if(!lives) {
      alert(`You lost: ${word}`);
      reset();
    }
  }, [
    lives, word
  ]);

  const handleWin = useCallback(() => {
    alert('You win');
    reset();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Hangman</h1>
        <hr className="solid"></hr>
      </header>
      <section className="rounded-container">
        Lives {lives}/5
      </section>
      <section className="rounded-container">
        <Playground onMiss={handleMisses} hangmanWord={word} onComplete={handleWin}/>
        <Misses misses={misses}/>
      </section>
    </div>
  );
};

export default App;
