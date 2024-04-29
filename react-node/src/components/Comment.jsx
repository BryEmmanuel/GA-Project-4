import React, { useContext } from "react";
import "./Comment.css";
import UserContext from "../context/user";

const Comment = (props) => {
  // useContext
  const userCtx = useContext(UserContext);
  return (
    <>
      <div className="comments_container">
        <div className="individual_comment_container">
          <div className="username">{props.username}</div>
          <div className="content">{props.contents}</div>
          <div className="time">{props.created_at}</div>
          {userCtx.role === "Admin" && (
            <button className="delete_comment_button">Delete</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
