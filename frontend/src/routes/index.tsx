import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";
import { Activate } from "../pages/Activate";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { Register } from "../pages/Register";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="activate" element={<Activate />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
