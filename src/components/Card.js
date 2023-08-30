import React from "react";
import PropTypes from "prop-types";
import "./Card.css";
import cover from "../assets/cover.jpg";
// import { useState } from "react";

const Card = ({ card }) => {

  const handleCardClick = () => {
    console.log("click click")
    console.log(card.id)
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="card-front-face">
        <img src={cover} alt="front-face"/>
      </div>
      <div className="card-back-face">
        <img src={card.src} alt="back-face"/>
      </div>
    </div>
    
  );
};

 Card.propTypes = {
  card: PropTypes.object.isRequired,
}; 

export default Card;

