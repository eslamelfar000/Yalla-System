import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import HomeCards from "../../components/HomeCard/HomeCards";
import HomeTeachers from "../../components/HomeTeachers/HomeTeachers";

function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <HomeCards/>
      <HomeTeachers/>
    </>
  );
}

export default Home;
