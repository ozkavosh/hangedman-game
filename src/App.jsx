import "./App.css";
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
