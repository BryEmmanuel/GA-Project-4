import React, { useContext } from "react";
import "./Comment.css";
import UserContext from "../context/user";

const Comment = (props) => {
  // useContext
  const userCtx = useContext(UserContext);

  return (
    <>
      {props.is_deleted === false && (
        <div className="comments_container">
          <div className="individual_comment_container">
            <div className="username">{props.username}</div>
            <div className="content">{props.contents}</div>
            <div className="time">{props.created_at}</div>
            {userCtx.userId === props.user_id && (
              <span className="user_delete_text">Delete</span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
