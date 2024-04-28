import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./KdramaPage.css";
import useFetch from "../hooks/useFetch";
import PostModal from "../components/PostModal";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import UserContext from "../context/user";

const KdramaPage = () => {
  // useParams
  const { kdrama } = useParams();
  // useFetch
  const fetchData = useFetch();
  // useContext
  const userCtx = useContext(UserContext);

  // states of the kdrama
  const [name, setName] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [year, setYear] = useState("");
  const [plot, setPlot] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [kdramaid, setKdramaid] = useState("");

  // track state of new post modal
  const [showPostModal, setShowPostModal] = useState(false);

  // track state of kdrama post
  const [kdramaPost, setKdramaPost] = useState([]);

  // get specific kdrama
  const getKdramaById = async () => {
    const res = await fetchData(
      "/kdrama/getkdrama/" + kdrama,
      "GET",
      undefined,
      undefined
    );
    if (res.ok) {
      setName(res.data[0].name);
      setEpisodeNumber(res.data[0].number_of_episodes);
      setYear(res.data[0].year_released);
      setPlot(res.data[0].plot);
      setImage(res.data[0].image_url);
      setGenre(res.data[0].genre_name);
      setKdramaid(res.data[0].id);
    }
  };

  // get discussions of the specific kdrama
  const getKdramaDiscussionById = async () => {
    const res = await fetchData(
      "/discussion/getkdramadiscussion/" + kdrama,
      "GET",
      undefined,
      undefined
    );
    if (res.ok) {
      const data = [...res.data];
      setKdramaPost(data);
    }
  };

  useEffect(() => {
    getKdramaById();
    getKdramaDiscussionById();
  }, []);
  return (
    <>
      <Navbar></Navbar>

      <div className="kdrama_page_container">
        <div className="kdrama_card">
          <div className="kdrama_trailer">TRAILER</div>
          <img src={image} className="kdrama_image"></img>
          <div className="kdrama_details">
            <h2>{name}</h2>
            <p>Episodes: {episodeNumber}</p>
            <p>Year Released: {year}</p>
            <p>{plot}</p>
            <p>Genre: {genre}</p>
          </div>
        </div>
        {showPostModal && (
          <PostModal
            setShowPostModal={setShowPostModal}
            getKdramaDiscussionById={getKdramaDiscussionById}
            setKdramaid={setKdramaid}
            kdramaid={kdramaid}
          />
        )}
      </div>
      <div className="kdrama_discussion_container">
        <div className="kdrama_discussion_post">
          {kdramaPost.map((post, index) => (
            <div className="kdrama_individual_post">
              <Post
                key={index}
                id={post.id}
                title={post.title}
                number_of_likes={post.number_of_likes}
                created_at={post.created_at}
                description={post.description}
                k_drama_name={post.k_drama_name}
                username={post.username}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="buttons_container">
        <button onClick={() => setShowPostModal(true)}>Create a Post!</button>
      </div>
    </>
  );
};

export default KdramaPage;
