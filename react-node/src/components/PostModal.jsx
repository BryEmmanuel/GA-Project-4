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

  const addNewDiscussion = async () => {
    try {
      const res = await fetchData(
        "/discussion/adddiscussion",
        "POST",
        {
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          k_drama_id: props.kdramaid,
        },
        undefined
      );
      if (res.ok) {
        props.getAllDisuccions();
        props.setShowPostModal(false);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <h1 style={{ color: "black" }}>Create a New Discussion</h1>
          <form onSubmit={addNewDiscussion}>
            <input ref={titleRef} type="text" placeholder="Title" required />
            <textarea ref={descriptionRef} placeholder="Description" required />
            <button type="submit">Submit</button>
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
          getAllDiscussions={props.getAllDiscussions}
          setShowPostModal={props.setShowPostModal}
        ></Overlay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default PostModal;
