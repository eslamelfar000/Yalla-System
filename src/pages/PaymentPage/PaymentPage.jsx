import React, { useState, useEffect } from "react";
import Page from "../../components/Payment/Page";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useBookingPersistence } from "../../hooks/useBookingPersistence";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { clearBookingData } = useBookingPersistence(); // Initialize booking persistence
  const booking = useSelector((state) => state.booking?.booking);
  const navigate = useNavigate();
  const teacherId = localStorage.getItem("teacherId");

  // Check if booking data exists, if not redirect to booking
  useEffect(() => {
    // Add a small delay to allow booking data to load from localStorage
    const timer = setTimeout(() => {
      // Don't redirect if we're on success page or if we have valid booking data
      const isSuccessPage = window.location.pathname === "/success";
      const hasValidBooking =
        booking?.teacherId &&
        booking?.eventDate &&
        booking?.eventDate?.length > 0;

      if (!hasValidBooking && !isSuccessPage) {
        navigate("/booking/" + (teacherId || "1"), { replace: true });
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [booking, navigate, teacherId]);

  // Don't render anything while checking booking data
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Page />
      <Footer />
    </>
  );
}

export default PaymentPage;
