import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Page from "../../components/Profile/UserProfile/page";
import Footer from "../../components/Footer/Footer";
import Layout from "../../components/Profile/UserProfile/layout";
import ProfileLayout from "../../components/Profile/UserProfile/profile-layout";

function UserProfilePage() {
  return (
    <>
      <Navbar />
      <ProfileLayout children={Page} />
      <Footer custom={true}/>
    </>
  );
}

export default UserProfilePage;
