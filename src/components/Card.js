import React from "react";
import PropTypes from "prop-types";
import "./Card.css";
import cover from "../assets/cover.jpg";
import { useState } from "react";

const Card = ({ index, card }) => {
const [isFlipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped(!isFlipped);
  };



  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={handleCardClick}>
      <div className="card-face front side">
        <img src={cover} alt="front-face"/>
      </div>
      <div className="card-face back side">
        <img src={card.src} alt="back-face"/>
      </div>
    </div>
    
  );
};

 Card.propTypes = {
  card: PropTypes.object.isRequired,
}; 

export default Card;

