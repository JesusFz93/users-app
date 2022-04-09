import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/auth";

export const AuthRouter = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route exact path="/auth/login" component={LoginPage} />

          <Navigate to="/auth/login" />
        </Routes>
      </div>
    </div>
  );
};
