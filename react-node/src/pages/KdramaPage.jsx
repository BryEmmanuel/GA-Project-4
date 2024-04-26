import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./KdramaPage.css";
import useFetch from "../hooks/useFetch";
import PostModal from "../components/PostModal";

const KdramaPage = () => {
  // useParams
  const { kdrama } = useParams();
  // useFetch
  const fetchData = useFetch();

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

  useEffect(() => {
    getKdramaById();
  }, []);

  return (
    <>
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
            setKdramaid={setKdramaid}
            kdramaid={kdramaid}
          />
        )}
      </div>
      <button style={{ color: "black" }} onClick={() => setShowPostModal(true)}>
        Create a Post!
      </button>
    </>
  );
};

export default KdramaPage;
