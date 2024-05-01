import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import "./Comments.css";
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

  // tract state of deletion
  const [deleted, setDeleted] = useState(false);

  // get specific discussion
  const getDiscussionById = async () => {
    const res = await fetchData(
      "/discussion/getspecificdiscussion/" + id,
      "PUT",
      undefined,
      userCtx.accessToken
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
      userCtx.accessToken
    );
    if (res.ok) {
      const data = res.data.filter((comment) => comment.is_deleted === false);
      setComments(data);
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
        userCtx.accessToken
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
        userCtx.accessToken
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
      userCtx.accessToken
    );
    if (res.ok) {
      setCommentContents("");
      toggleButtonInput();
      if (hasCommented === false) {
        setHasCommented(true);
      } else {
        setHasCommented(false);
      }
      console.log("comment added");
    }
  };

  // function to delete comments
  const deleteComment = async (commentId) => {
    const res = await fetchData(
      "/comments/delete/" + commentId,
      "DELETE",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setComments(comments.filter((comment) => comment.id !== id));
      if (deleted === false) {
        setDeleted(true);
      } else {
        setDeleted(false);
      }
    } else {
      console.error("Failed to delete comment");
    }
  };

  // function to delete own comments as user
  const deleteOwnComments = async (commentId) => {
    console.log(commentId);
    console.log(userCtx.accessToken);
    const res = await fetchData(
      "/comments/" + commentId,
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      const comment = res.data;
      // compare user_id of comment with current user's id
      if (comment[0].user_id === userCtx.userId) {
        const deleteRes = await fetchData(
          "/comments/delete/" + commentId,
          "DELETE",
          undefined,
          userCtx.accessToken
        );
        if (deleteRes.ok) {
          setComments(comments.filter((comment) => comment.id !== commentId));
        } else {
          console.error("failed to delete comment");
        }
      } else {
        console.error("you can only delete your own comments");
      }
    } else {
      console.error("failed to get comment");
    }
  };

  useEffect(() => {
    getDiscussionById();
    getCommentsOfDiscussion();
    console.log(userCtx);
  }, [hasLiked, hasDisliked, hasCommented, deleted]);
  // add hasCommented, comments deleted comments

  return (
    <>
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
              <div className="individual_comments">
                <Comment
                  key={index}
                  contents={comment.contents}
                  created_at={timeAgo(new Date(comment.created_at))}
                  username={comment.username}
                  is_deleted={comment.is_deleted}
                  user_id={comment.user_id}
                  id={comment.id}
                  deleteOwnComments={deleteOwnComments}
                />
                {userCtx.role === "Admin" && (
                  <button
                    className="x_button"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
            .reverse()}
        </div>
      </div>
    </>
  );
};

export default Comments;
