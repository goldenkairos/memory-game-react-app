import React from "react";
import PropTypes from "prop-types";
import "./Card.css";
import cover from "../assets/cover.jpg";
import { useState } from "react";

const Card = ({ index, card, isFlipped, onClick }) => {
  // const [isFlipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    // if (!isFlipped) {
    //   setFlipped(true);
    // }
    onClick(card);
  };

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
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
