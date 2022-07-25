import { useState, useContext, createContext } from "react";
import words from "../data/words.json";

const GameContext = createContext();

const useGameContext = () => {
  return useContext(GameContext);
};

const GameContextProvider = ({ children }) => {
  const [currentWord, setCurrentWord] = useState("");

  const generateWord = () => {
    let randomWord = words[Math.round(Math.random() * (words.length - 1))];
    while (randomWord === currentWord) {
      randomWord = words[Math.round(Math.random() * (words.length - 1))];
    }

    setCurrentWord(randomWord);
  };

  return (
    <GameContext.Provider value={{ currentWord, generateWord }}>
      {children}
    </GameContext.Provider>
  );
};

export { useGameContext, GameContextProvider };
