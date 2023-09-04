import React from "react";
import PropTypes from "prop-types";
import "./Card.css";
import cover from "../assets/cover.jpg";
import { useState } from "react";

const Card = ({ card, index, onClick }) => {
  const [isFlipped, setFlipped] = useState(false);

  const handleCardClick = (index) => {
    // if (!isFlipped){ //uncomment this when we don't want user to flip this back
    setFlipped(!isFlipped);
    console.log(isFlipped);
  // } //uncomment this when we don't want user to flip this back
  };

  return (
    <div
      className={`card${isFlipped ? " flipped" : ""}`}
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
