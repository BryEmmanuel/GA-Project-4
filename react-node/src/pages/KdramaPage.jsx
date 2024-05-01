import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./KdramaPage.css";
import useFetch from "../hooks/useFetch";
import PostModal from "../components/PostModal";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import UserContext from "../context/user";
import YoutubeEmbed from "../components/YoutubeEmbed";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";

const KdramaPage = () => {
  // useParams
  const { kdrama } = useParams();
  // useFetch
  const fetchData = useFetch();
  // useContext
  const userCtx = useContext(UserContext);
  // useNavigate
  const navigate = useNavigate();

  // states of the kdrama
  const [name, setName] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [year, setYear] = useState("");
  const [plot, setPlot] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [kdramaid, setKdramaid] = useState("");
  const [kdramaEmbed, setKdramaEmbed] = useState("");

  // track state of new post modal
  const [showPostModal, setShowPostModal] = useState(false);

  // track state of kdrama post
  const [kdramaPost, setKdramaPost] = useState([]);

  // track state of favourited kdrama
  const [favouritedKdramas, setFavouritedKdramas] = useState(false);

  // get specific kdrama
  const getKdramaById = async () => {
    const res = await fetchData(
      "/kdrama/getkdrama/" + kdrama,
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setName(res.data[0].name);
      setEpisodeNumber(res.data[0].number_of_episodes);
      setYear(res.data[0].year_released);
      setPlot(res.data[0].plot);
      setImage(res.data[0].image_url);
      setGenre(res.data[0].genre_name);
      setKdramaid(res.data[0].id);
      setKdramaEmbed(res.data[0].youtube_url);
    }
  };

  // get discussions of the specific kdrama
  const getKdramaDiscussionById = async () => {
    const res = await fetchData(
      "/discussion/getkdramadiscussion/" + kdrama,
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      const data = res.data.filter(
        (discussion) => discussion.is_deleted === false
      );
      setKdramaPost(data);
    }
  };

  // delete kdrama page
  const deleteKdrama = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this K-drama page?"
    );
    if (confirmDelete) {
      const res = await fetchData(
        "/kdrama/deletekdrama/" + kdrama,
        "DELETE",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        navigate("/main");
      }
    }
  };

  // function to favourite kdrama
  const favouriteKdrama = async () => {
    try {
      const res = await fetchData(
        "/favourites/addfavourites",
        "POST",
        { userId: userCtx.userId, kdramaId: kdramaid },
        userCtx.accessToken
      );
      if (res.ok) {
        setFavouritedKdramas(true);
        alert("favourited");
      } else {
        console.log("error , failed to favourite kdrama");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // function to unfavourite kdrama
  const removeFavouriteKdrama = async () => {
    try {
      const res = await fetchData(
        "/favourites/removefavourites",
        "DELETE",
        { userId: userCtx.userId, kdramaId: kdramaid },
        userCtx.accessToken
      );
      if (res.ok) {
        console.log(favouritedKdramas);
        setFavouritedKdramas(false);
        console.log(favouritedKdramas);
        alert("unfavourited");
        console.log(favouritedKdramas);
      } else {
        console.log("error, failed to unfavourite kdrama");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the user's favorites list
  const fetchUserFavourites = async () => {
    console.log(userCtx.userId);
    const res = await fetchData(
      "/favourites/userfavourites/" + userCtx.userId,
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      const userFavourites = res.data;
      // Check if the current K-drama is in the user's favorites list
      const isFavorited = userFavourites.some(
        (fav) => fav.kdrama_id === kdramaid
      );
      setFavouritedKdramas(isFavorited);
    }
  };

  useEffect(() => {
    getKdramaById();
    getKdramaDiscussionById();
    fetchUserFavourites();
    if (!favouritedKdramas) {
      console.log("K-drama has been unfavorited");
    }
  }, [favouritedKdramas, kdramaid]);
  return (
    <>
      <Navbar></Navbar>

      <div className="kdrama_page_container">
        <div className="kdrama_card">
          <div className="kdrama_trailer">
            <YoutubeEmbed embedId={kdramaEmbed} />
          </div>
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
                is_deleted={post.is_deleted}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="buttons_container">
        <button onClick={() => setShowPostModal(true)}>Create a Post!</button>
        {favouritedKdramas === false ? (
          <button onClick={() => favouriteKdrama()}>
            <FcLike />
          </button>
        ) : (
          <button onClick={() => removeFavouriteKdrama()}>
            <FcDislike />
          </button>
        )}

        {userCtx.role === "Admin" && (
          <button
            onClick={() => {
              deleteKdrama();
            }}
          >
            Delete Page
          </button>
        )}
      </div>
    </>
  );
};

export default KdramaPage;
