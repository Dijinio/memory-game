import React, { useState, useEffect } from 'react'

function Card({ id, cardNo, active, imageClicked, show, imageTheme }) {
  const [image, setImage] = useState('');
  const [rotate, setRotate] = useState('');

  // Display image if
  useEffect(() => {
    let int = 0;

    if (show || !active) {
      setImage(`card-image-${cardNo}`);
      setRotate('rotate');
    } else {
      setRotate('');
      int = setInterval(() => {
        setImage('');
      }, 1000);
    }

    return () => { clearInterval(int) }

  }, [show, active]);

  function handleImageClick() {
    imageClicked(id, cardNo);
  }

  return (
    <div className="card" onClick={handleImageClick}>
      <div className={`card-inner ${rotate}`}>
        <div className="card-front">
       </div>
        <div className={`card-back ${imageTheme} ${image}`}>
        </div>
        </div>
      </div>
  )
}

export default Card;
