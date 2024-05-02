import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <>
      {props.is_deleted === false && (
        <Link to={`/main/${props.name}`} className="card">
          <img src={props.image_url} className="card_image"></img>
          <div className="card__content">
            <p className="card__title">{props.name}</p>
            <p className="card__description">{props.plot}</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default Card;
