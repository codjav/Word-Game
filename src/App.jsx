import React, { useState } from "react";
import "./app.css";
import { languages } from "./assets/language";
import { getFarewell } from "./assets/getFarewell";
import { wordChoose } from "./utils/wordChoose";
import Confetti from "react-confetti";

const App = () => {
  const [currentWord, setCurrentWord] = useState(() => wordChoose());
  const [guessedLetter, setGuessedLetter] = useState([]);

  const wrongGuessArray = guessedLetter.filter(letter => 
    !currentWord.includes(letter)
  )

  const show = !currentWord.includes(guessedLetter[guessedLetter.length-1]);
  
  const wrongGuessCount = wrongGuessArray.length;

  const isGameWon = currentWord.split('').filter(letter => 
  !guessedLetter.toString().includes(letter)).length === 0;

  const isGameLost = wrongGuessCount>=languages.length;

  const isGameOver = isGameWon || isGameLost;

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  function addGuessedLetter(letter) {
    setGuessedLetter(guessedLetter => guessedLetter.includes(letter) ? guessedLetter : [...guessedLetter, letter] )
  }

  const reset = () => {
    setCurrentWord(wordChoose)
    setGuessedLetter([])
  }
  
  const languageElements = languages.map((lang, index) => {
    const isLost = index< wrongGuessCount;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }

    return (
      <span 
        className={`chip ${isLost? 'lost' : ''}`} key={lang.name} 
        style={styles}
      >
      {lang.name}</span>
    )
  });

  const letterElements = currentWord.split('').map((letter, index) =>{
    const clasname= `${isGameLost && !guessedLetter.includes(letter)? 'losted' : ''} `
    return (
    <span
      key={index}
      className={clasname}
    >
      {isGameLost || guessedLetter.includes(letter)? letter.toUpperCase() : ''}
    </span>
    )
});

  const keyboardElements = alphabet.split('').map((letter) => {
    const isGuessed = guessedLetter.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    return (
    <button
      className={
        isCorrect? 'correct' 
        : isWrong ? 'wrong' 
        : ''
      }
      key={letter}
      aria-disabled={guessedLetter.includes(letter)}
      aria-label={`Letter ${letter}`}
      disabled={isGameOver} 
      onClick={() => addGuessedLetter(letter)}
    >
      {letter.toUpperCase()}
    </button>
    )
  });

  return (
    <main>
      {
        isGameWon && 
        <Confetti 
          recycle={false}
          numberOfPieces={800}
        />
      }
      <header>
        <h1>Assembly - Wordgame</h1>
        <p>
          Guess the word within 9 attempts to keep the programming world safe from Assembly!
        </p>
      </header>
      <section aria-live="polite" role="status" className={`game-status ${isGameLost? 'lost' : isGameWon? 'won' : 'nothing'}`}>
        {wrongGuessCount!=0 & !isGameOver & show? (
          <p className="fareWell">
            {getFarewell(languages[wrongGuessCount-1].name)}
          </p>
        )
        :isGameOver ? (
          isGameWon ? 
            <>
              <h2>You win!</h2>
              <p>Well done! 🎉</p>
            </>
           : 
            <>
              <h2>Game Over!</h2>
              <p>You lose! Better start learning Assembly😭</p>
            </>
          ):(
            <>
            </>
          )
        }
      </section>
      <section className="language-chips">
        {languageElements}
      </section >
      <section className="word">
        {letterElements}
      </section>
      <section className='keyboard'>
        {keyboardElements}
      </section>
      {isGameOver && <button className="newgame" onClick={reset}>New Game</button>}
    </main>
  );
};

export default App;
