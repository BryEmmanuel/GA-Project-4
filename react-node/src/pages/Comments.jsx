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
        </div>
        <div className="post_comments">
          {comments.map((comment, index) => (
            <Comment
              key={index}
              contents={comment.contents}
              created_at={comment.created_at}
            ></Comment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
