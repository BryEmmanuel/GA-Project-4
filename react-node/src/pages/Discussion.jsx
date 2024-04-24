import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Post from "../components/Post";

const Discussion = () => {
  // useFetch
  const fetchData = useFetch();

  // track state of discussion list
  const [discussions, setDiscussions] = useState([]);

  // get discussions
  const getAllDiscussions = async () => {
    try {
      const res = await fetchData(
        "/discussion/getdiscussion",
        "GET",
        undefined,
        undefined
      );
      if (res.ok) {
        const data = [...res.data];
        setDiscussions(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    getAllDiscussions();
  }, []);

  return (
    <>
      {discussions.map((post, index) => (
        <Post
          key={index}
          id={post.id}
          title={post.title}
          number_of_likes={post.number_of_likes}
          created_at={post.created_at}
          k_drama_id={post.k_drama_id}
          description={post.description}
        ></Post>
      ))}
    </>
  );
};

export default Discussion;
