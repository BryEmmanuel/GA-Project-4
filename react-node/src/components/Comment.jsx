import React from "react";

const Comment = (props) => {
  return (
    <>
      <h1>{props.contents}</h1>
      <h2>{props.created_at}</h2>
    </>
  );
};

export default Comment;
