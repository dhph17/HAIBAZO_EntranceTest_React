import Main from "./pages/Main/Main"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameMedium from "./pages/GameMedium/GameMedium";
import GameEasy from "./pages/GameEasy/GameEasy";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mode1/:name" element={<GameEasy />} />
          <Route path="/mode2/:name" element={<GameMedium />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
