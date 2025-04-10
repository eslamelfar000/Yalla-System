import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

const RootLayout = () => {
  const { pathname } = useLocation();
  const currentStep = useSelector((state) => state.step.currentStep);

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname, currentStep]);

  return (
    <div>
      <Outlet /> {/* This renders the child components */}
    </div>
  );
};

export default RootLayout;
