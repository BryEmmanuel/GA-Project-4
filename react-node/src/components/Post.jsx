import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = (props) => {
  return (
    <div>
      <Link to={`/discussion/comments/${props.id}`} className="post">
        <h1>{props.title}</h1>
        <h2>{props.description}</h2>
        <h2>{props.username}</h2>
      </Link>
    </div>
  );
};

export default Post;
