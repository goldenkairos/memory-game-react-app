import React from "react";
import PropTypes from "prop-types";
import "./Card.css";
import cover from "../assets/cover.jpg";
import { useState } from "react";

const Card = ({ card, index, onClick, isFlipped}) => {
  const [localIsFlipped, setLocalIsFlipped] = useState(isFlipped);

  const handleCardClick = (index) => {
    // if (!isFlipped){ //uncomment this when we don't want user to flip this back
    setLocalIsFlipped(!localIsFlipped);
    // console.log(isFlipped);
    onClick();
    console.log(card.flipped);
    console.log(card.cardName);
  // } //uncomment this when we don't want user to flip this back
  };

  return (
    <div
      className={`card${card.flipped ? " flipped" : ""}`}
      onClick={handleCardClick}
    >
      <div className="card-face front">
        <img src={cover} alt="front-face" />
      </div>
      <div className="card-face back">
        <img src={card.src} alt="back-face" />
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Card;
