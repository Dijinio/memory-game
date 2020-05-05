import React from 'react';
import GameBoard from './components/GameBoard';
import './style/app.scss';

function App() {
  return (
    <div className="app">
      <h1 className="game-title">Memory Game</h1>
      <GameBoard />
    </div>
  );
}

export default App;
