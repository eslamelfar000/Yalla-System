import React from "react";
import AllTeacherSection from "../../components/AllTeacherSection/AllTeacherSection";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SecHeader from "../../components/SecHeader/SecHeader";
import LayoutWithVerification from "../../components/LayoutWithVerification/LayoutWithVerification";

function AllTeachers() {
  return (
    <LayoutWithVerification>
      <Navbar />
      <SecHeader
        title={"Your journey to Arabic fluency"}
        subtitle={"Starts here !"}
      />
      <AllTeacherSection />
      <Footer />
    </LayoutWithVerification>
  );
}

export default AllTeachers;
