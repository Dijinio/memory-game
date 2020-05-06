import React, { useState, useEffect } from 'react'

function GameOverModal({ gameOver, recordTime, startNewGame }) {
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    (gameOver) ? setModalActive(true) : setModalActive(false);
  }, [gameOver]);

  function handleClick() {
    startNewGame();
  }

  return (
    <div
      className={`modal ${modalActive ? 'active' : ''}`}
      onClick={() => setModalActive(false)}>
      <div className="modal-body">
        <h1>You Win!</h1>
        <h1>Time: <strong>{recordTime}</strong> seconds</h1>
        <button onClick={handleClick}>Start New Game</button>
      </div>
    </div>
  )
}

export default GameOverModal
