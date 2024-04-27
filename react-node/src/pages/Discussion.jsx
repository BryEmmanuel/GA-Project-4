import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Post from "../components/Post";
import Navbar from "../components/Navbar";

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
      <Navbar></Navbar>
      <div className="kdrama_discussion_container">
        <div className="kdrama_discussion_post">
          {discussions.map((post, index) => (
            <div className="kdrama_individual_post">
              <Post
                key={index}
                id={post.id}
                title={post.title}
                number_of_likes={post.number_of_likes}
                created_at={post.created_at}
                k_drama_id={post.k_drama_id}
                description={post.description}
              ></Post>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Discussion;
