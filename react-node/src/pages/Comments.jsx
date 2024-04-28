import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import "./Comments.css";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import UserContext from "../context/user";

const Comments = () => {
  // useFetch
  const fetchData = useFetch();
  // useParams
  const { id } = useParams();
  // useContext
  const userCtx = useContext(UserContext);

  // track state of discussion post
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postUsername, setPostUsername] = useState("");
  const [numberOfLikes, setNumberOfLikes] = useState("");

  // track if user has liked/disliked a post
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  // track state of comments
  const [comments, setComments] = useState([]);

  // track toggle state of button and input
  const [isInput, setIsInput] = useState(false);

  // track state of input comment field
  const [commentContents, setCommentContents] = useState("");

  // track state of commented
  const [hasCommented, setHasCommented] = useState(false);

  // get specific discussion
  const getDiscussionById = async () => {
    const res = await fetchData(
      "/discussion/getspecificdiscussion/" + id,
      "PUT",
      undefined,
      undefined
    );
    if (res.ok) {
      setPostTitle(res.data[0].title);
      setPostDescription(res.data[0].description);
      setPostUsername(res.data[0].username);
      setNumberOfLikes(res.data[0].number_of_likes);
    }
  };

  // get comments of this discussion post
  const getCommentsOfDiscussion = async () => {
    const res = await fetchData(
      "/comments/discussion/" + id,
      "PUT",
      undefined,
      undefined
    );
    if (res.ok) {
      const data = [...res.data];
      setComments(data);
      console.log(data);
    }
  };

  // function to convert time format
  function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    const interval = Math.floor(seconds / 31536000);
    if (interval > 1) return interval + " years ago";
    if (interval === 1) return interval + " year ago";

    const months = Math.floor(seconds / 2628000);
    if (months > 1) return months + " months ago";
    if (months === 1) return months + " month ago";

    const days = Math.floor(seconds / 86400);
    if (days > 1) return days + " days ago";
    if (days === 1) return days + " day ago";

    const hours = Math.floor(seconds / 3600);
    if (hours > 1) return hours + " hours ago";
    if (hours === 1) return hours + " hour ago";

    const minutes = Math.floor(seconds / 60);
    if (minutes > 1) return minutes + " minutes ago";
    if (minutes === 1) return minutes + " minute ago";

    return "just now";
  }

  // function to handle likes counter
  const handleLikeButton = async () => {
    if (!hasLiked) {
      const res = await fetchData(
        "/discussion/increaselikes/" + id,
        "PATCH",
        undefined,
        undefined
      );
      if (res.ok) {
        setHasLiked(true);
        setHasDisliked(false);
      }
    }
  };

  // function to handle dislike counter
  const handleDislikeButton = async () => {
    if (!hasDisliked) {
      const res = await fetchData(
        "/discussion/decreaselikes/" + id,
        "PATCH",
        undefined,
        undefined
      );
      if (res.ok) {
        setHasDisliked(true);
        setHasLiked(false);
      }
    }
  };

  // function to toggle between button and input field
  const toggleButtonInput = () => {
    setIsInput(!isInput);
  };

  // function to add comment
  const addComment = async (e) => {
    e.preventDefault();
    const res = await fetchData(
      "/comments/new",
      "POST",
      {
        discussion_id: id,
        user_id: userCtx.userId,
        contents: commentContents,
      },
      undefined
    );
    if (res.ok) {
      setCommentContents("");
      if (hasCommented === false) {
        setHasCommented(true);
      } else {
        setHasCommented(false);
      }
      console.log("comment added");
    }
  };

  useEffect(() => {
    getDiscussionById();
    getCommentsOfDiscussion();
  }, [hasLiked, hasDisliked, hasCommented]);

  return (
    <>
      <Navbar></Navbar>
      <div className="post_container">
        <div className="post_header">
          <h6>{postUsername}</h6>
        </div>
        <div className="post_content">
          <h2>{postTitle}</h2>
          <h6>{postDescription}</h6>
        </div>
        <div className="post_interactions">
          <button className="like_button">
            <AiOutlineLike
              className="like_icon"
              onClick={handleLikeButton}
              disabled={hasLiked}
            />
            <span>{numberOfLikes}</span>
            <AiOutlineDislike
              className="dislike_icon"
              onClick={handleDislikeButton}
              disabled={hasDisliked}
            />
          </button>
          {isInput ? (
            <form className="inputForm">
              <input
                type="text"
                style={{ color: "black" }}
                placeholder="Enter comment"
                onChange={(e) => setCommentContents(e.target.value)}
              />
              <button
                type="submit"
                className="comment_button"
                onClick={addComment}
              >
                Comment
              </button>
              <button
                type="button"
                className="close_button"
                onClick={toggleButtonInput}
              >
                X
              </button>
            </form>
          ) : (
            <button onClick={toggleButtonInput} className="comment_button">
              Comment
            </button>
          )}
        </div>
        <div className="post_comments">
          {[...comments]
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            .map((comment, index) => (
              <Comment
                key={index}
                contents={comment.contents}
                created_at={timeAgo(new Date(comment.created_at))}
                username={comment.username}
              ></Comment>
            ))
            .reverse()}
        </div>
      </div>
    </>
  );
};

export default Comments;
