import React from "react";
import PropTypes from "prop-types";
import "./Card.css";
import cover from "../assets/cover.jpg";
import { useState } from "react";

const Card = ({ card, index, onClick, isFlipped}) => {
  const [localIsFlipped, setLocalIsFlipped] = useState(isFlipped);

  const handleCardClick = (index) => {
    setLocalIsFlipped(!localIsFlipped);
    onClick();
    console.log("state",card.flipped);
    console.log("name",card.cardName);
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
