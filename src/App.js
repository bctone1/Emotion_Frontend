import Header from "./components/header";
import Footer from "./components/footer";
import Puzzle from "./components/puzzle ";
import Section from "./components/section1";
import "../src/index.css"

import { useState } from 'react';

function App() {
  const [PuzzleStatus, setPuzzleStatus] = useState(1);
  return (

    <>
      <div className="container">
        <Header />

        <div class="main-puzzle-container">
          <Puzzle PuzzleStatus={PuzzleStatus} />
          <Section PuzzleStatus={PuzzleStatus} setPuzzleStatus={setPuzzleStatus} />
        </div>

      </div>

      <Footer />
    </>

  );
}

export default App;
