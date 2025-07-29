import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import LayoutWithVerification from "../../components/LayoutWithVerification/LayoutWithVerification";
import Page from "../../components/SessionBooking/Page";
import { useBookingPersistence } from "../../hooks/useBookingPersistence";

function BookingPage() {
  const { id } = useParams();
  useBookingPersistence(); // Initialize booking persistence

  useEffect(() => {
    localStorage.setItem("teacherId", id);
  }, []);

  return (
    <LayoutWithVerification>
      <Navbar />
      <Page teacherId={id} />
      {/* <Footer /> */}
    </LayoutWithVerification>
  );
}

export default BookingPage;
