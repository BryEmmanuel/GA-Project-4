import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import Post from "../components/Post";
import "./Discussion.css";
import UserContext from "../context/user";

const Discussion = () => {
  // useFetch
  const fetchData = useFetch();

  // useContext
  const userCtx = useContext(UserContext);

  // track state of discussion list
  const [discussions, setDiscussions] = useState([]);

  // get discussions
  const getAllDiscussions = async () => {
    try {
      const res = await fetchData(
        "/discussion/getdiscussion",
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        const data = res.data.filter(
          (discussion) => discussion.is_deleted === false
        );
        setDiscussions(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  };

  // delete post
  const deletePost = async (id) => {
    const res = await fetchData(
      "/discussion/deletediscussion/" + id,
      "DELETE",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      // Remove the deleted discussion from the state
      setDiscussions(discussions.filter((post) => post.id !== id));
    } else {
      console.error("Failed to delete");
    }
  };

  useEffect(() => {
    getAllDiscussions();
  }, []);

  return (
    <>
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
                username={post.username}
                is_deleted={post.is_deleted}
              ></Post>
              {userCtx.role === "Admin" && (
                <button
                  className="delete_post_button"
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Discussion;
