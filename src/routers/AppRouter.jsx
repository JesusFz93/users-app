import React, { useContext, useEffect } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import { AuthContext } from "../auth/AuthContext";
import { Loading } from "../components/Loading";
import { LoginPage } from "../pages/Auth";

import { SistemasRoutes } from "./sistemas.routes";
import { NoRoutes } from "./no.routes";

export const AppRouter = () => {
  const { auth, verificaToken } = useContext(AuthContext);

  useEffect(() => {
    verificaToken();
  }, [verificaToken]);

  if (auth.checking) {
    return <Loading />;
  }

  let componentes;
  switch ("USER") {
    case "USER":
      componentes = <SistemasRoutes />;
      break;

    default:
      componentes = <NoRoutes />;
      break;
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path="/*" element={<PrivateRoute>{componentes}</PrivateRoute>} />
      </Routes>
    </Router>
  );
};
