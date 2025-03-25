import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const RootLayout = () => {

    const { pathname } = useLocation();

      // Automatically scrolls to top whenever pathname changes
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

  return (
    <div>
      <Outlet /> {/* This renders the child components */}
    </div>
  );
};

export default RootLayout;
