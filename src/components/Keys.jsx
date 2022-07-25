import { Row, Col } from "react-bootstrap";
import { useGameContext } from "../context/gameContext";
import useSound from "use-sound";
import hover from '../data/sound/select.mp3';
import '../css/Keys.css';

const Keys = ({handleGuess}) => {
  const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const { tried } = useGameContext();

  const [play, { stop }] = useSound(
    hover,
    { volume: 0.25 }
  ); 

  return (
    <Row className="mt-5">
      {keys.map((key) => {
        return tried.includes(key.toLowerCase()) || (
          <Col className="key" onClick={() => handleGuess(null, key)} onMouseEnter={play} onMouseLeave={stop} key={key}>
            <img src={require(`../data/img/${key}_Key.png`)} alt="" />
          </Col>
        );
      })}
    </Row>
  );
};

export default Keys;
