import { Row, Col } from "react-bootstrap";
import '../css/Result.css';

const Win = ({ word, replayHandler }) => {
  return (
    <Row>
      <Col className="resultBox">
        <h3>Ganaste</h3>
        <div className="d-flex justify-content-between">
          <h4 className="d-inline">La palabra fue {word}.</h4>
          <button onClick={replayHandler}>
            <img className="hand" src={require("../data/img/Textbox_Hand.png")} alt="" />
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default Win;
