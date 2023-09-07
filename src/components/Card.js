import React from "react";
import PropTypes from "prop-types";
import "./Card.css";
import cover from "../assets/cover.jpg";
// import { useState } from "react";

const Card = ({ card, index, flipped, handleCardSlection}) => {
  // const [localIsFlipped, setLocalIsFlipped] = useState(isFlipped);

  const handleCardClick = () => {
    // setLocalIsFlipped(!localIsFlipped);
    // onClick();
    // console.log("state",card.flipped);
    // console.log("name",card.cardName);
    handleCardSlection(index);
  };

  return (
    <div
      // className={`card${card.flipped ? " flipped" : ""}`}
      className={`card${flipped ? " flipped" : ""} ${card.matchFound ? "inactive" : "active"}`}
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
