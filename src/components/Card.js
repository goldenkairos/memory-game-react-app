import React from "react";
import PropTypes from "prop-types";
import "./Card.css";
import cover from "../assets/cover.jpg";
// import { useState } from "react";

const Card = ({ card }) => {

  return (
    <div className="card">

      <div className="card-front-face">
        <img src={cover} alt="front-face"/>
      </div>
    </div>
  );
};

//  Card.propTypes = {
//   card: PropTypes.object.isRequired,
// }; 

export default Card;
