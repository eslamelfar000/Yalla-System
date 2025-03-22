import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import HomeCards from "../../components/HomeCard/HomeCards";
import HomeTeachers from "../../components/HomeTeachers/HomeTeachers";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <HomeCards/>
      <HomeTeachers/>
      <HomeSlider/>
      <Footer/>
    </>
  );
}

export default Home;
