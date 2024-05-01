import React, { useContext, useEffect, useState } from "react";
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

  // Filter userFavouritedKdramas to only include those with is_favorited === true
  const filteredFavouritedKdramas = userFavouritedKdramas.filter(
    (kdrama) => kdrama.is_favorited === true
  );

  return (
    <>
      <div className="main_container">
        {filteredFavouritedKdramas.map((kdrama, index) => (
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
              is_favorited={kdrama.is_favorited}
            ></Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourites;
