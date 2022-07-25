import { useState, useRef, useEffect } from "react";
import { useGameContext } from "../context/gameContext";
import { Container } from "react-bootstrap";
import useSound from "use-sound";
import error from "../data/sound/error.mp3";
import victory from "../data/sound/victory.mp3";
import gameover from "../data/sound/gameover.mp3";
import Fail from "./Fail";
import Win from "./Win";
import Keys from "./Keys";
import "../css/Main.css";

const Main = () => {
  const { generateWord, currentWord, tried, setTried } = useGameContext();
  const [gameState, setGameState] = useState("playing");
  const [guessed, setGuessed] = useState([]);
  const [lives, setLives] = useState(5);
  const guessInputRef = useRef();

  const [playError] = useSound(error, { volume: 0.25 });
  const [playVictory, { stop: stopVictory }] = useSound(victory, {
    volume: 0.3,
  });
  const [playGameover, { stop: stopGameover }] = useSound(gameover, {
    volume: 0.3,
  });

  const handleGuess = (e, key) => {
    !key && e.preventDefault();
    const guess =
      key?.toLowerCase() || guessInputRef.current.value.toLowerCase();
    guessInputRef.current.value = "";

    if (guessed.some((g) => g === guess)) return playError();

    if (!tried.some((t) => t === guess)) {
      setTried([...tried, guess]);
    } else {
      return playError();
    }

    const attempt = currentWord.replaceAll(`${guess}`, "");

    attempt === currentWord
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
    setTried([]);
    setGameState("playing");
    generateWord();
  };

  useEffect(() => {
    switch (gameState) {
      case "playing":
        stopVictory();
        stopGameover();
        break;
      case "victory":
        playVictory();
        break;
      case "gameover":
        playGameover();
        break;
      default:
        break;
    }
  }, [gameState]);

  useEffect(() => {
    lives === 0 && setGameState("gameover");
    guessed.length === [...new Set(currentWord)].length &&
      setGameState("victory");
  }, [lives, guessed.length]);

  return (
    <Container fluid className="main d-flex align-items-center">
      <Container className="text-light">
        {gameState === "victory" ? (
          <Win word={currentWord} replayHandler={replay} />
        ) : gameState === "gameover" ? (
          <Fail word={currentWord} replayHandler={replay} />
        ) : (
          <div>
            <h1>HANGMAN</h1>
            <h2>Su palabra: {getCurrentHidden()}</h2>
            <h3>
              <img src={require("../data/img/HP.png")} alt="lives" /> {lives}
            </h3>
            <form onSubmit={handleGuess}>
              <input
                ref={guessInputRef}
                type="text"
                minLength="1"
                maxLength="1"
                placeholder="Ingrese una letra"
                className="inputTry"
              />
              <button type="submit" className="btnTry">
                <img
                  className="hand"
                  src={require("../data/img/Textbox_Hand.png")}
                  alt=""
                />
              </button>
            </form>
            <Keys handleGuess={handleGuess} />
          </div>
        )}
      </Container>
    </Container>
  );
};

export default Main;
