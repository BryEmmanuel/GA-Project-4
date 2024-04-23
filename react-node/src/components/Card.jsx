import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <img src={props.image_url} className="card_image"></img>
      <div className="card__content">
        <p className="card__title">{props.name}</p>
        <p className="card__description">{props.plot}</p>
      </div>
    </div>
  );
};

export default Card;
