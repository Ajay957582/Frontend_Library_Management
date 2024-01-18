import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function userNameHandler(e) {
    setUserName(e.target.value);
  }
  function emailHandler(e) {
    setEmail(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }
  function registerSubmit(e) {
    e.preventDefault();

    try {
      fetch("http://localhost:2000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "user is registered successfully") {
            navigate("/login");
          }
        });
    } catch (error) {
      console.log(error, "from register form post request");
    }
  }
  return (
    <>
      <div className=" h-screen flex justify-center items-center">
        <div className="bg-yellow-300 h-70 w-1/3">
          <div className=" text-2xl p-4 text-center">SIGN-UP</div>
          <div className=" h-full">
            <form
              className="  py-12 px-14 flex-col space-y-15 h-full"
              onSubmit={registerSubmit}
            >
              <div>
                <input
                  type="text"
                  className="w-full h-12 mb-3 p-4"
                  placeholder="User name"
                  onChange={userNameHandler}
                  value={userName}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="w-full h-12 mb-3 p-4"
                  placeholder="email"
                  onChange={emailHandler}
                  value={email}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="w-full h-12 mb-3 p-4"
                  placeholder="Password"
                  onChange={passwordHandler}
                  value={password}
                />
              </div>
              <div>
                <input
                  type="submit"
                  className="w-full h-12 bg-stone-200 cursor-pointer mb-3 p-4"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
