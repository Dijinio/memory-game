import React, { useState, useEffect } from 'react';
import Card from './Card';
import Menu from './Menu';
import GameOverModal from './GameOverModal';

function GameBoard({  }) {
  const [cards, setCards] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [imageTheme, setImageTheme] = useState('numbers');
  const [gameOn, setGameOn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [recordTime, setRecordTime] = useState(0);

  // Start new game when loaded
  useEffect(() => {
    startNewGame();
  }, []);

  // Check if game is over
  useEffect(() => {
    if ((!cards.some(card => card.active)) && gameOn) {
      setGameOver(true);
    }
  }, [cards])

  // Check if clicked cards are same
  useEffect(() => {
    if (clickedCards.length >= 2) {
      if (clickedCards[0].cardNo === clickedCards[1].cardNo) {
        const newCards = [...cards];
        newCards.forEach(card => {
          if (card.cardNo === clickedCards[0].cardNo) {
            card.active = false;
          }
        });
        setCards(newCards);
      }
      setClickedCards([]);
    }
  }, [clickedCards]);

  function startNewGame() {
    setCards(cards => createCards());
    setClickedCards([]);
    setClickCount(0);
    setGameOn(false);
    setGameOver(false);
    setRecordTime(0);
  }

  // Create cards array
  function createCards() {
    const cards = [];

    // Generate dublicate random numbers and shuffle
    const randomNums = [];
    for (let i = 1; i <= 8; i++) {
      randomNums.push(i);
      randomNums.push(i);
    }
    randomNums.sort(() => { return 0.5 - Math.random() });

    // Create Cards with random IDs
    for (let i = 0; i < randomNums.length; i++) {
      cards.push(
        { id: i, cardNo: randomNums[i], active: true, show: false }
      )
    }

    return cards;
  }

  // Create game board
  function createBoard() {
    const board = [];

    cards.forEach(card => {
      board.push(
        <Card
          key={card.id}
          id={card.id}
          cardNo={card.cardNo}
          active={card.active}
          show={card.show}
          imageClicked={imageClicked}
          imageTheme={imageTheme} />
      )
    });

    return board;
  }

  // Handle Image Click
  function imageClicked(id, cardNo) {
    // Start Timer
    if (!gameOn) {
      setGameOn(true);
    }
    // do nothing if clicked on the same card
    if (clickedCards[0] && clickedCards[0].id === id) return;

    const newCards = [...cards];
    setClickedCards(clickedCards => [...clickedCards, {id, cardNo}]);

    if (clickCount < 2) {
      newCards.forEach(card => {
        if (card.id === id) {
          card.show = true;
        }
      });
      setClickCount(clickCount => clickCount += 1);
      setCards(newCards);
    } else {
      newCards.forEach(card => {
        if (card.show) {
          card.show = false;
        }
        if (card.id === id) {
          card.show = true;
        }
      });
      setCards(newCards);
      setClickCount(1);
    }

  }

  function changeTheme(theme) {
    setImageTheme(theme);
  }

  function handleGameOver(time) {
    setRecordTime(time);
  }

  return (
    <div className="game-container">
      <GameOverModal
        gameOver={gameOver}
        recordTime={recordTime}
        startNewGame={startNewGame}/>
      <Menu
        startNewGame={startNewGame}
        imageTheme={imageTheme}
        changeTheme={changeTheme}
        gameOn={gameOn}
        gameOver={gameOver}
        handleGameOver={handleGameOver}/>
      <div className="game-board">
        { createBoard() }
      </div>
    </div>
  )
}

export default GameBoard;
