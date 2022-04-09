import React from "react";
import { AppRouter } from "./routers/AppRouter.jsx";
import { AuthProvider } from "./auth/AuthContext";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
