import React, { useEffect, useState } from "react";
// import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../src/components/Home";
import Search from "../src/components/Search";
import Mybooks from "./components/Mybooks";
import Profile from "./components/Profile";
import Register2 from "./components/Register2";
// import Login from "./components/Login";
import Addbook from "./components/Addbook";
import Addadmin from "./components/Addadmin";
// import Irbook from "./components/Irbook";
import Authadmin from "./components/Authadmin";
import AuthUser from "./components/AuthUser";
import Header2 from "./components/Header2";
import Login2 from "./components/Login2";
import Irbook2 from "./components/Irbook2";
import { Snackbar, Alert, LinearProgress } from "@mui/material";

function App() {
  const [src, setSrc] = useState("");
  const [tokenInBrowser, setTokenInBrowser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // const tokenFromLocal = localStorage.getItem("token");
  const [severity, setSeverity] = useState("");
  const [showSnackBar, setSnakeBar] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function checkAdmin(tokenFromLocal) {
    try {
      fetch("https://backed-for-library-management.onrender.com/isadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenFromLocal }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "is admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        });
    } catch (error) {
      console.log(error, "from app component");
    }
  }

  useEffect(function () {
    if (localStorage.getItem("token")) {
      setTokenInBrowser(true);
      checkAdmin(localStorage.getItem("token"));
    }
  }, []);
  useEffect(
    function () {
      if (localStorage.getItem("token")) {
        checkAdmin(localStorage.getItem("token"));
      }
    },
    [tokenInBrowser]
  );
  return (
    <Router>
      {/* <Header
        tokenInBrowser={tokenInBrowser}
        isAdmin={isAdmin}
        setTokenInBrowser={setTokenInBrowser}
      /> */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackBar}
        // message={snackMsg}
        autoHideDuration={4000}
        onClose={() => setSnakeBar(false)}
      >
        <Alert
          onClose={() => setSnakeBar(false)}
          variant="filled"
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
      <Header2
        tokenInBrowser={tokenInBrowser}
        isAdmin={isAdmin}
        setTokenInBrowser={setTokenInBrowser}
        src={src}
        setSrc={setSrc}
        setSnakeBar={setSnakeBar}
        setSnackMsg={setSnackMsg}
        setSeverity={setSeverity}
      />
      {isLoading ? <LinearProgress /> : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route
          path="search"
          element={
            <AuthUser tokenInBrowser={tokenInBrowser}>
              <Search
                setSnakeBar={setSnakeBar}
                setSnackMsg={setSnackMsg}
                setSeverity={setSeverity}
              />
            </AuthUser>
          }
        />
        <Route
          path="mybooks"
          element={
            <AuthUser tokenInBrowser={tokenInBrowser}>
              <Mybooks setIsLoading={setIsLoading} />
            </AuthUser>
          }
        />
        <Route
          path="profile"
          element={
            <AuthUser tokenInBrowser={tokenInBrowser}>
              <Profile src={src} />
            </AuthUser>
          }
        />
        <Route
          path="register"
          element={
            <Register2
              setSnackMsg={setSnackMsg}
              setSnakeBar={setSnakeBar}
              setSeverity={setSeverity}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="login"
          element={
            <Login2
              setTokenInBrowser={setTokenInBrowser}
              setSeverity={setSeverity}
              setSnackMsg={setSnackMsg}
              setSnakeBar={setSnakeBar}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route path="admin">
          <Route
            path="addbook"
            element={
              <Authadmin isAdmin={isAdmin}>
                <Addbook
                  setIsLoading={setIsLoading}
                  setSnackMsg={setSnackMsg}
                  setSnakeBar={setSnakeBar}
                  setSeverity={setSeverity}
                />
              </Authadmin>
            }
            index
          />
          <Route
            path="irbook"
            element={
              <Authadmin isAdmin={isAdmin}>
                <Irbook2
                  setIsLoading={setIsLoading}
                  setSnackMsg={setSnackMsg}
                  setSnakeBar={setSnakeBar}
                  setSeverity={setSeverity}
                />
              </Authadmin>
            }
          />
          <Route
            path="addadmin"
            element={
              <Authadmin isAdmin={isAdmin}>
                <Addadmin
                  setIsLoading={setIsLoading}
                  setSnackMsg={setSnackMsg}
                  setSnakeBar={setSnakeBar}
                  setSeverity={setSeverity}
                />
              </Authadmin>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
