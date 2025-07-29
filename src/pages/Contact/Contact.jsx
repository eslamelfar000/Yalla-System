import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ContactSection from "../../components/ContactSection/ContactSection";
import Footer from "../../components/Footer/Footer";
import SecHeader from "../../components/SecHeader/SecHeader";
import LayoutWithVerification from "../../components/LayoutWithVerification/LayoutWithVerification";

function Contact() {
  return (
    <LayoutWithVerification>
      <Navbar />
      <SecHeader title={"Contact Us"} subtitle={"Starts here !"} size={true} />
      <ContactSection />
      <Footer />
    </LayoutWithVerification>
  );
}

export default Contact;
