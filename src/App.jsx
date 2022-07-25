import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./components/Main";
import { GameContextProvider } from "./context/gameContext";

const App = () => {
  return (
    <GameContextProvider>
      <Main/>
    </GameContextProvider>
  )
};

export default App;
