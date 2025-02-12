import React, { useState } from "react";
import "./valentine.css";

export default function Valentine() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const yesButtonSize = noCount * 5 + 16; // Adjusted growth for better fit

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const moveNoButton = () => {
    const randomX = Math.floor(Math.random() * 200) - 100; // Move within ±100px horizontally
    const randomY = Math.floor(Math.random() * 100) - 50;  // Move within ±50px vertically
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const getNoButtonText = () => {
    const phrases = [
      "No!",
      "Why man? : (",
      "What if I asked really nicely?",
      "Pretty please",
      "PRETTY PLEASE IM SAYING NO MAN",
      "WHAT ABOUT IF I GET YOU A BOBA",
      "PLEASE MAN",
      "But :*(",
      "I am going to die man",
      "you will be talking to my ghost",
      "ok ur talking to yu's ghost",
      "please jaanu",
      ":(((",
      ">:(",
      "rip.",
      ">:^("
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="valentine-container">
      {yesPressed ? (
        <>
          <img
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="Bear Kisses"
            className="valentine-image"
          />
          <div className="valentine-message">YAY I LOVE YOU JAANU :))</div>
        </>
      ) : (
        <>
          <img
            className="valentine-image"
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
            alt="Cute Love Bear"
          />
          <h1 className="valentine-heading">Will you be my Valentine wii?</h1>
          <div className="valentine-buttons">
            <button
              className="yes-button"
              style={{ fontSize: `${yesButtonSize}px` }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className="no-button"
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`
              }}
              onMouseEnter={moveNoButton}
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}