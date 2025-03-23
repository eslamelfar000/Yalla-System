import React from "react";
import AllTeacherSection from "../../components/AllTeacherSection/AllTeacherSection";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SecHeader from "../../components/SecHeader/SecHeader";

function AllTeachers() {
  return (
    <>
      <Navbar />
      <SecHeader
        title={"Your journey to Arabic fluency"}
        subtitle={"Starts here !"}
      />
      <AllTeacherSection />
      <Footer />
    </>
  );
}

export default AllTeachers;
