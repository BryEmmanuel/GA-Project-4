import React, { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar";
import SideNavBar from "../components/SideNavBar";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import Card from "../components/Card";

const HomePage = () => {
  // useFetch
  const fetchData = useFetch();
  // useContext
  const userCtx = useContext(UserContext);

  // track the state of kdrama card
  const [kdramaCard, setKdramaCard] = useState([]);

  // get all kdrama card
  const displayKdrama = async () => {
    try {
      const res = await fetchData(
        "/kdrama/getkdrama",
        "GET",
        undefined,
        undefined
      );
      if (res.ok) {
        const data = [...res.data];
        setKdramaCard(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    displayKdrama();
  });

  return (
    <>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="homepage_container">
        homepage
        {kdramaCard.map((kdrama, index) => (
          <Card
            id={kdrama.id}
            key={index}
            name={kdrama.name}
            number_of_episodes={kdrama.number_of_episodes}
            year_released={kdrama.year_released}
            plot={kdrama.plot}
            image_url={kdrama.image_url}
            genre_id={kdrama.genre_id}
          ></Card>
        ))}
      </div>
    </>
  );
};

export default HomePage;