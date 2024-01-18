import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminOptions from "./AdminOptions.js";

function Header({ tokenInBrowser, isAdmin, setTokenInBrowser }) {
  const navigate = useNavigate();
  const [burgurIsActive, setBurgurIsActive] = useState(false);
  function logOutHandler() {
    localStorage.removeItem("token");
    setTokenInBrowser(false);
    navigate("/");
  }
  function burgurHandler() {
    setBurgurIsActive((state) => !state);
  }
  return (
    <header className="transition-all duration-500">
      <div className="bg-yellow-200 flex items-center justify-between px-10 py-4">
        <div className="flex space-x-5">
          <button className="" onClick={burgurHandler}>
            &#10006;
          </button>
          <div className="text-lg">logo</div>
        </div>
        <div>
          {tokenInBrowser ? (
            <div>profile</div>
          ) : (
            <div className="space-x-7">
              <button>
                <Link to="/register">Sign-up</Link>
              </button>
              <button>
                <Link to="/login">Login</Link>
              </button>
            </div>
          )}
        </div>
      </div>
      {burgurIsActive ? (
        tokenInBrowser ? (
          <section className="bg-yellow-200 p-20 space-y-16 text-lg">
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/search">Search</Link>
            </div>
            <div>
              <Link to="/mybooks">My Books</Link>
            </div>
            <div>
              <Link to="/profile">Profile</Link>
            </div>
            {isAdmin ? <AdminOptions /> : null}
            <button onClick={logOutHandler}>Log-Out</button>
          </section>
        ) : (
          <section className="bg-yellow-200 p-20 space-y-16 text-lg">
            <div>
              <Link to="/register">Register</Link>
            </div>
            <div>
              <Link to="/login">Login</Link>
            </div>
          </section>
        )
      ) : null}
    </header>
  );
}

export default Header;
