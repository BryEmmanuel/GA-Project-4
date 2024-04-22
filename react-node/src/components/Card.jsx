import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <img src={props.image_url}></img>
    </div>
  );
};

export default Card;
