import ProfileLayout from "./profile-layout"
export const metadata = {
  title: "User Profile",
};

const Layout = ({ children }) => {
  return (
    <div className="cover py-10 px-15">
      <ProfileLayout></ProfileLayout>
    </div>
  );
};

export default Layout;
