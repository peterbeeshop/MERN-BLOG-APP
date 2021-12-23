import "./App.css";
// import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function App({ user, setUser }) {
  const navigate = useNavigate();

  function logout() {
    fetch("http://localhost:5000/user/logout", {
      method: "GET",
    })
      .then((res) => res.text())
      .then((txt) => {
        console.log(txt);
        setUser("");
        navigate("/login");
      });
  }
  if (user === "") {
    return (
      <div>
        <div className="app">
          <Link to={"/blog"}>
            <h2>Blogs</h2>
          </Link>
          <Link to={"/newBlog"}>
            <h2>New Blog</h2>
          </Link>
          <Link to={"/about"}>
            <h2>About</h2>
          </Link>
          <Link to={"/login"}>
            <h2>Log In</h2>
          </Link>
        </div>
      </div>
    );
  } else if (user) {
    return (
      <div>
        <div className="app">
          <Link to={"/blog"}>
            <h2>Blogs</h2>
          </Link>
          <Link to={"/newBlog"}>
            <h2>New Blog</h2>
          </Link>
          <Link to={"/about"}>
            <h2>About</h2>
          </Link>
          <h5>Welcome {user}</h5>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default App;
