import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NoPage } from "../pages/No";

export const NoRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path="/noroute" element={<NoPage />} />

        <Route path="*" element={<Navigate to="/noroute" />} />
      </Routes>
    </>
  );
};
