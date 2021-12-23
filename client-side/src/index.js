import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Outlet,
} from "react-router-dom";

import "./index.css";
import App from "./App";
import Home from "./components/Home";
import About from "./components/About";
import Log from "./components/Log";
import NewBlog from "./components/NewBlog";
import DetailsPage from "./components/DetailsPage";
import Register from "./components/Register";

const Routing = () => {
  const [user, setUser] = useState("");

  return (
    <Router>
      <App user={user} setUser={setUser} />
      <Routes>
        <Route path="/blog" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<DetailsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/newBlog" element={<NewBlog />} />
        <Route path="/login" element={<Log user={user} setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};
ReactDOM.render(<Routing />, document.getElementById("root"));
