"use client";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/header";
import SettingsHeader from "./components/settings-header";
import Page from "./page";
import { cn } from "@/lib/utils";
import Settings from "./settings/page";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";

const ProfileLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [load, setLoad] = useState(false);
  const localUserData = JSON.parse(localStorage.getItem("user_data"));
  const [previewPublicImage, setPreviewPublicImage] = useState({
    image: "",
    file: "",
  });

  // Fetch updated user data with sessions
  const { data: apiUserData, isLoading, error } = useGetUserProfile(true);

  // Debug: Log authentication status
  console.log("Profile Layout - Auth Debug:", {
    hasLocalUserData: !!localUserData,
    hasApiUserData: !!apiUserData,
    isLoading,
    error: error?.message,
    errorStatus: error?.response?.status,
  });

  // Use API data if available, otherwise fallback to localStorage
  const user_data = apiUserData?.data || localUserData;

  useEffect(() => {
    if (pathname === "/profile-setting") {
      setTimeout(() => {
        setLoad(false);
        window.scrollTo(0, 0);
      }, 300);
    } else {
      setTimeout(() => {
        setLoad(true);
        window.scrollTo(0, 0);
      }, 300);
    }
  }, [pathname]);

  return (
    <React.Fragment>
      <div className={`cover p-5 xl:py-10 xl:px-15 bg-second`}>
        {pathname === "/profile-setting" ? (
          <div
            className={`opacity-0 translate-y-10 transition duration-300 ${
              load === false && "opacity-100 translate-y-[0] "
            }`}
          >
            <Header
              setting={true}
              user_data={user_data}
              previewPublicImage={previewPublicImage}
            />
            <Settings
              user_data={user_data}
              previewPublicImage={previewPublicImage}
              setPreviewPublicImage={setPreviewPublicImage}
            />
          </div>
        ) : (
          <div
            className={`opacity-0 translate-y-10 transition duration-300 ${
              load === true && "opacity-100 translate-y-[0]"
            }`}
          >
            {/* <Header /> */}
            <Page user_data={user_data} isLoading={isLoading} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProfileLayout;
