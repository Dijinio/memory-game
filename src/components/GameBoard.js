import React, { useState, useEffect } from 'react';
import '../style/game_board.scss';
import Card from './Card';

function GameBoard({  }) {
  const [cards, setCards] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [imageTheme, setImageTheme] = useState('numbers');

  useEffect(() => {
    startNewGame();
  }, []);

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

  return (
    <div className="game-container">
      <button
        className="new-game mem-button"
        onClick={() => startNewGame()}>
          New Game
        </button>
      <div className="game-board">
        { createBoard() }
      </div>
      <div className="theme">
        <button
          className={`mem-button ${imageTheme === 'numbers' ? 'active' : ''}`}
          onClick={() => setImageTheme('numbers')}>
            Numbers
        </button>
        <button
          className={`mem-button ${imageTheme === 'fruits' ? 'active' : ''}`}
          onClick={() => setImageTheme('fruits')}>
            Fruits
        </button>
        <button
          className={`mem-button ${imageTheme === 'animals' ? 'active' : ''}`}
          onClick={() => setImageTheme('animals')}>
            Animals
        </button>
      </div>
    </div>
  )
}

export default GameBoard;
