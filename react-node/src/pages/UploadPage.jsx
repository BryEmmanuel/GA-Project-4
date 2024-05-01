import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./UploadPage.css";
import UserContext from "../context/user";

const UploadPage = () => {
  // useFetch
  const fetchData = useFetch();
  // useNavigate
  const navigate = useNavigate();
  // useContext
  const userCtx = useContext(UserContext);

  const [name, setName] = useState("");
  const [numberOfEpisodes, setNumberOfEpisodes] = useState("");
  const [yearReleased, setYearReleased] = useState("");
  const [plot, setPlot] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // call api
    const res = await fetchData(
      "/kdrama/addkdrama/",
      "POST",
      {
        name: name,
        number_of_episodes: numberOfEpisodes,
        year_released: yearReleased,
        plot: plot,
        image_url: imageUrl,
        genre: genre,
        youtube_url: videoUrl,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      navigate("/main");
    }
    console.log({
      name,
      numberOfEpisodes,
      yearReleased,
      plot,
      imageUrl,
      genre,
      videoUrl,
    });
  };

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            style={{ color: "black" }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Number of Episodes:
          <input
            style={{ color: "black" }}
            min="0"
            type="number"
            value={numberOfEpisodes}
            onChange={(e) => {
              const value = e.target.value;
              if (value < 0) {
                setNumberOfEpisodes(0);
              } else {
                setNumberOfEpisodes(value);
              }
            }}
          />
        </label>
        <label>
          Year Released:
          <input
            style={{ color: "black" }}
            type="text"
            value={yearReleased}
            onChange={(e) => setYearReleased(e.target.value)}
          />
        </label>
        <label>
          Plot:
          <textarea
            style={{ color: "black" }}
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            style={{ color: "black" }}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label>
          Genre:
          <select
            style={{ color: "black" }}
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select a genre</option>
            <option value="ACTION">Action</option>
            <option value="COMEDY">Comedy</option>
            <option value="FANTASY">Fantasy</option>
            <option value="ROMANCE">Romance</option>
            <option value="THRILLER">Thriller</option>
            <option value="HORROR">Horror</option>
            <option value="MELODRAMA">Melodrama</option>
            <option value="REVENGE">Revenge</option>
          </select>
        </label>
        <label>
          Embed ID:
          <input
            style={{ color: "black" }}
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadPage;
