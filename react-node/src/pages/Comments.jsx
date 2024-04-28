import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import "./Comments.css";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";

const Comments = () => {
  // useFetch
  const fetchData = useFetch();
  // useParams
  const { id } = useParams();

  // track state of discussion post
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postUsername, setPostUsername] = useState("");

  // track state of comments
  const [comments, setComments] = useState([]);

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
      console.log(res.data);
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

  useEffect(() => {
    getDiscussionById();
    getCommentsOfDiscussion();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="post_container">
        <div className="post_discussion">
          <h2>{postTitle}</h2>
          <h6>{postDescription}</h6>
          <h6>{postUsername}</h6>
        </div>
        <div className="post_comments">
          {comments.map((comment, index) => (
            <Comment
              key={index}
              contents={comment.contents}
              created_at={timeAgo(new Date(comment.created_at))}
              username={comment.username}
            ></Comment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
