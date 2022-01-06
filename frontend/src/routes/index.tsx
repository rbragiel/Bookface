import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "@components/layout";
import { Activate } from "@pages/Activate";
import { Home } from "@pages/Home";
import { NotFound } from "@pages/NotFound";
import { Register } from "@pages/Register";
import { Dashboard } from "@pages/Dashboard";
import { Main } from "@pages/Main";
import { Invitations } from "@pages/Invitations";
import { Friends } from "@pages/Friends";
import { Chat } from "@pages/Chat";
import { User } from "@pages/User";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="activate" element={<Activate />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Main />} />
            <Route path="invitations" element={<Invitations />} />
            <Route path="friends" element={<Friends />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="users/:userId" element={<User />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
