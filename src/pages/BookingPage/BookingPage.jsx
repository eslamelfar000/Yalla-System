import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Page from "../../components/SessionBooking/Page";

function BookingPage() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <Page teacherId={id} />
      {/* <Footer /> */}
    </>
  );
}

export default BookingPage;
