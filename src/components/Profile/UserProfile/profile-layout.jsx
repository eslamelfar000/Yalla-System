"use client";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/header";
import SettingsHeader from "./components/settings-header";
import Page from "./page";
import { cn } from "@/lib/utils";
import Settings from "./settings/page";
const ProfileLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [load,  setLoad] = useState(false);

  useEffect(() => {
      setTimeout(() => {
        setLoad(!load);
        window.scrollTo(0, 0);
      }, 300);
  }, [pathname]);

  return (
    <React.Fragment>
      <div className={`cover p-5 xl:py-10 xl:px-15 bg-second`}>
        {pathname === "/profile-setting" ? (
          <div
            className={`opacity-0 translate-y-10 transition duration-300 ${
              !load && "opacity-100 translate-y-[0] "
            }`}
          >
            <Header />
            <Settings />
          </div>
        ) : (
          <div
            className={`opacity-0 translate-y-10 transition duration-300 ${
              load && "opacity-100 translate-y-[0]"
            }`}
          >
            <Header />
            <Page />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProfileLayout;
