import React, { useState } from "react";
import "./index.css"; // Import CSS

const WORDS = ["apple", "grape", "mango", "peach", "lemon"];
const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const WordleGame = () => {
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(6);
  const [gameStatus, setGameStatus] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setCurrentGuess(e.target.value.toLowerCase());
  };

  // Handle submitting a guess
  const handleGuessSubmit = () => {
    if (currentGuess.length !== 5) {
      alert("Enter a 5-letter word!");
      return;
    }
    if (!WORDS.includes(currentGuess)) {
      alert("Invalid word! Try again.");
      return;
    }

    setGuesses([...guesses, currentGuess]);
    setAttemptsLeft(attemptsLeft - 1);

    if (currentGuess === targetWord) {
      setGameStatus("won");
    } else if (attemptsLeft - 1 === 0) {
      setGameStatus("lost");
    }

    setCurrentGuess("");
  };

  // Get class for each letter (fixes color issue)
  const getLetterClass = (word, letter, index, targetWord) => {
    let targetWordLetterCount = {};

    // Count occurrences of letters in target word
    for (let char of targetWord) {
      targetWordLetterCount[char] = (targetWordLetterCount[char] || 0) + 1;
    }

    let result = new Array(5).fill("absent");

    // First, mark correct positions (Green)
    for (let i = 0; i < 5; i++) {
      if (word[i] === targetWord[i]) {
        result[i] = "correct";
        targetWordLetterCount[word[i]]--;
      }
    }

    // Then, mark misplaced letters (Yellow)
    for (let i = 0; i < 5; i++) {
      if (result[i] !== "correct" && targetWord.includes(word[i]) && targetWordLetterCount[word[i]] > 0) {
        result[i] = "present";
        targetWordLetterCount[word[i]]--;
      }
    }

    return result[index]; // Return class for the letter
  };

  // Restart game
  const handleNewGame = () => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setCurrentGuess("");
    setAttemptsLeft(6);
    setGameStatus("");
  };

  return (
    <div className="wordle-container">
      <h1>Wordle Clone</h1>

      <div className="grid">
        {guesses.map((word, wordIndex) => (
          <div key={wordIndex} className="row">
            {word.split("").map((letter, index) => (
              <div key={index} className={`cell ${getLetterClass(word, letter, index, targetWord)}`}>
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      {gameStatus === "" && (
        <>
          <input
            type="text"
            maxLength="5"
            value={currentGuess}
            onChange={handleInputChange}
          />
          <button onClick={handleGuessSubmit}>Submit</button>
        </>
      )}

      {gameStatus && (
        <p className={`message ${gameStatus}`}>
          {gameStatus === "won" ? "You Win!" : "Game Over!"}
        </p>
      )}

      <button onClick={handleNewGame} className="new-game">
        New Game
      </button>
    </div>
  );
};

export default WordleGame;
