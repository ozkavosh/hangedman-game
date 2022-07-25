import { useState, useRef, useEffect } from "react";
import { useGameContext } from "../context/gameContext";

const Main = () => {
  const { generateWord, currentWord } = useGameContext();
  const [guessed, setGuessed] = useState([]);
  const [lives, setLives] = useState(5);
  const generateWordRef = useRef(generateWord);
  const guessInputRef = useRef();

  const handleGuess = (e) => {
    e.preventDefault();
    const guess = guessInputRef.current.value[0];
    const attempt = currentWord.replaceAll(`${guess}`, "");
    attempt === currentWord || guessed.some((g) => g === guess)
      ? setLives(lives - 1)
      : setGuessed([...guessed, guess]);
  };

  const getCurrentHidden = () =>
    [...currentWord].map((l) => {
      return guessed.some((g) => g === l) ? l : "_ ";
    });

  const replay = () => {
    setLives(5);
    setGuessed([]);
    generateWordRef.current();
  };

  useEffect(() => {
    generateWordRef.current();
  }, []);

  return lives > 0 ? (
    <div>
      <h1>Juego del ahorcadito :D</h1>
      <h2>Su palabra: {getCurrentHidden()}</h2>
      <h3>Vidas: {lives}</h3>
      {guessed.length !== [...new Set(currentWord)].length ? (
        <form onSubmit={handleGuess}>
          <input
            ref={guessInputRef}
            type="text"
            minLength="1"
            maxLength="1"
            placeholder="Ingrese una letra"
          />
          <button type="submit">Probar</button>
        </form>
      ) : (
        <div>
          <h3>Ganaste :D</h3>
          <h4>La palabra fue {currentWord}</h4>
          <button onClick={replay}>Jugar otra vez</button>
        </div>
      )}
    </div>
  ) : (
    <div>
      <h3>Te quedaste sin vidas!</h3>
      <h4>La palabra fue {currentWord}</h4>
      <button onClick={replay}>Jugar otra vez</button>
    </div>
  );
};

export default Main;
