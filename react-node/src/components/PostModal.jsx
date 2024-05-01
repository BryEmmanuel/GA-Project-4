import React, { useContext, useRef } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./PostModal.module.css";

const Overlay = (props) => {
  // useRef
  const titleRef = useRef();
  const descriptionRef = useRef();
  // useFetch
  const fetchData = useFetch();
  // useContext
  const userCtx = useContext(UserContext);

  const addNewDiscussion = async (e) => {
    e.preventDefault();
    console.log("add new discussion", userCtx.userId);
    try {
      const res = await fetchData(
        "/discussion/adddiscussion",
        "POST",
        {
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          k_drama_id: props.kdramaid,
          user_id: userCtx.userId,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        props.getKdramaDiscussionById();
        props.setShowPostModal(false);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  };

  // function to close modal
  const closeModal = (e) => {
    e.preventDefault();
    props.setShowPostModal(false);
  };

  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <h1 style={{ color: "black" }}>Create a New Discussion</h1>
          <form onSubmit={addNewDiscussion}>
            <input
              ref={titleRef}
              type="text"
              placeholder="Title"
              required
              style={{ color: "black" }}
            />
            <textarea
              ref={descriptionRef}
              placeholder="Description"
              required
              style={{ color: "black" }}
            />

            <button type="submit">Submit</button>
            <br />
            <button onClick={closeModal}>Close</button>
          </form>
        </div>
      </div>
    </>
  );
};

const PostModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          kdramaid={props.kdramaid}
          setKdramaid={props.setKdramaid}
          getKdramaDiscussionById={props.getKdramaDiscussionById}
          setShowPostModal={props.setShowPostModal}
        ></Overlay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default PostModal;
