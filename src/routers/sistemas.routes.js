import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";

import { HomePage } from "../pages/Home";
import { SecretPage } from "../pages/Secret";

export const SistemasRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/secret" element={<SecretPage />} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};
