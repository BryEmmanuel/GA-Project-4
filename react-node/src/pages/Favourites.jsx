import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import Card from "../components/Card";
import "./Favourites.css";

const Favourites = () => {
  // useFetch
  const fetchData = useFetch();
  // useContext
  const userCtx = useContext(UserContext);

  // state to track list of favourited kdramas
  const [userFavouritedKdramas, setUserFavouritedKdramas] = useState([]);

  const displayFavouriteKdramas = async () => {
    console.log(userCtx.userId);
    try {
      const res = await fetchData(
        "/favourites/userfavourites/" + userCtx.userId,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setUserFavouritedKdramas(res.data);
      } else {
        console.log("fail to get fav kdramas");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    displayFavouriteKdramas();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      {userFavouritedKdramas.map((kdrama, index) => (
        <div className="favourites_page_container">
          <Card
            id={kdrama.id}
            key={index}
            name={kdrama.name}
            number_of_episodes={kdrama.number_of_episodes}
            year_released={kdrama.year_released}
            plot={kdrama.plot}
            image_url={kdrama.image_url}
            genre_id={kdrama.genre_id}
            is_deleted={kdrama.is_deleted}
          ></Card>
        </div>
      ))}
    </>
  );
};

export default Favourites;
