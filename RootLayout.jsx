import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Outlet /> {/* This renders the child components */}
    </div>
  );
};

export default RootLayout;
