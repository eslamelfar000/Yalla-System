import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { Loader } from "lucide-react";

function App() {

  
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
