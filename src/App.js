import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../src/components/Home";
import Search from "../src/components/Search";
import Mybooks from "./components/Mybooks";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import Addbook from "./components/Addbook";
import Addadmin from "./components/Addadmin";
import Irbook from "./components/Irbook";
import Authadmin from "./components/Authadmin";
import AuthUser from "./components/AuthUser";

function App() {
  const [tokenInBrowser, setTokenInBrowser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const tokenFromLocal = localStorage.getItem("token");

  function checkAdmin(tokenFromLocal) {
    try {
      fetch("http://localhost:2000/isadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenFromLocal }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "is admin") {
            setIsAdmin(true);
          }
        });
    } catch (error) {
      console.log(error, "from app component");
    }
  }

  useEffect(
    function () {
      if (tokenFromLocal) {
        setTokenInBrowser(true);
        checkAdmin(tokenFromLocal);
      }
    },
    [tokenFromLocal]
  );
  useEffect(
    function () {
      if (tokenFromLocal) {
        checkAdmin(tokenFromLocal);
      }
    },
    [tokenInBrowser, tokenFromLocal]
  );
  return (
    <Router>
      <Header
        tokenInBrowser={tokenInBrowser}
        isAdmin={isAdmin}
        setTokenInBrowser={setTokenInBrowser}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route
          path="search"
          element={
            <AuthUser tokenInBrowser={tokenInBrowser}>
              <Search />
            </AuthUser>
          }
        />
        <Route
          path="mybooks"
          element={
            <AuthUser tokenInBrowser={tokenInBrowser}>
              <Mybooks />
            </AuthUser>
          }
        />
        <Route
          path="profile"
          element={
            <AuthUser tokenInBrowser={tokenInBrowser}>
              <Profile />
            </AuthUser>
          }
        />
        <Route path="register" element={<Register />} />
        <Route
          path="login"
          element={<Login setTokenInBrowser={setTokenInBrowser} />}
        />
        <Route path="admin">
          <Route
            path="addbook"
            element={
              <Authadmin isAdmin={isAdmin}>
                <Addbook />
              </Authadmin>
            }
            index
          />
          <Route
            path="irbook"
            element={
              <Authadmin isAdmin={isAdmin}>
                <Irbook />
              </Authadmin>
            }
          />
          <Route
            path="addadmin"
            element={
              <Authadmin isAdmin={isAdmin}>
                <Addadmin />
              </Authadmin>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
