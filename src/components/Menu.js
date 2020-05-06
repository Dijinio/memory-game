import React, { useState, useEffect } from 'react'

function Menu({ startNewGame, changeTheme, imageTheme, gameOn, gameOver, handleGameOver }) {
  const [slideDown, setSlideDown] = useState(false);
  const [clock, setClock] = useState(0);
  const [int, setInt] = useState(0);

  useEffect(() => {
    // Start Timer on new game
    if (gameOn) {
      setInt(setInterval(() => {
        setClock(clock => clock += 1);
      }, 1000));
    }
    else {
      setInt(int => clearInterval(int));
      setClock(0);
    }

    // Send time to parent when game over
    if (gameOver) {
      setInt(int => clearInterval(int));
      handleGameOver(clock);
    }

    return () => {
      setInt(int => clearInterval(int));
    }
  }, [gameOn, gameOver]);

  function handleNewGame() {
    startNewGame();
  }

  function handleDropdown() {
    setSlideDown(slideDown => !slideDown);
  }

  function handleTheme(e) {
    changeTheme(e.target.innerText.toLowerCase());
  }

  return (
    <div className="menu">
      <div className="menu-item theme-dropdown link" onClick={handleDropdown}>
        <p>Theme</p>
        <ul className={`theme-list ${slideDown ? 'slidedown' : ''}`}>
          <li
          className={(imageTheme === 'numbers') ? 'active' : ''}
          onClick={handleTheme}>Numbers</li>
          <li
          className={(imageTheme === 'fruits') ? 'active' : ''}
          onClick={handleTheme}>Fruits</li>
          <li
          className={(imageTheme === 'animals') ? 'active' : ''}
          onClick={handleTheme}>Animals</li>
        </ul>
      </div>
      <div className="menu-item link" onClick={handleNewGame}>
        <p>New Game</p>
      </div>
      <div className="menu-item">
        <p><i className="far fa-clock"></i>{clock}</p>
      </div>
    </div>
  )
}

export default Menu
