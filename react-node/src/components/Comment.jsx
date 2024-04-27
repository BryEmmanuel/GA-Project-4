import React from "react";
import "./Comment.css";

const Comment = (props) => {
  return (
    <>
      <div className="comments_container">
        <div className="individual_comment_container">
          <div className="username">{props.username}</div>
          <div className="content">{props.contents}</div>
          <div className="time">{props.created_at}</div>
        </div>
      </div>
    </>
  );
};

export default Comment;
