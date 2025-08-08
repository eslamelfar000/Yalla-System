import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { Loader } from "lucide-react";
import { UserDataProvider } from "./context/UserDataContext";

function App() {
  return (
    <UserDataProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </UserDataProvider>
  );
}

export default App;
