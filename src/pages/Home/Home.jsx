import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import HomeCards from "../../components/HomeCard/HomeCards";
import HomeTeachers from "../../components/HomeTeachers/HomeTeachers";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";
import LayoutWithVerification from "../../components/LayoutWithVerification/LayoutWithVerification";
import { useGetData } from "@/hooks/useGetData";

function Home() {
  const { data, isLoading, isError } = useGetData({
    endpoint: "home-api",
    queryKey: ["homeData"],
  });

  const homeData = data?.data;

  return (
    <LayoutWithVerification>
      <Navbar />
      <Hero />
      <HomeCards />
      <Banner />
      <HomeTeachers teachers={homeData?.teachers} isLoading={isLoading} />
      <HomeSlider reviews={homeData?.reviews} isLoading={isLoading} />
      <Footer />
    </LayoutWithVerification>
  );
}

export default Home;
