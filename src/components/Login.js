import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setTokenInBrowser }) {
  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");
  const navigate = useNavigate();

  function loginSubmitHandler(e) {
    e.preventDefault();
    try {
      fetch("http://localhost:2000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lemail, lpassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.token) {
            localStorage.setItem("token", data.token);
            setTokenInBrowser(true);
            navigate("/");
          }
          if (data.message === "wrong password") {
            console.log(data);
          }
          if (data.message === "user not exists") {
            navigate("/register");
          }
        });
    } catch (error) {
      console.log(error, "from login form submission at frontend");
    }
  }

  return (
    <>
      <div className=" h-screen flex justify-center items-center">
        <div className="bg-yellow-300 h-70 w-1/3">
          <div className=" text-2xl p-4 text-center">LOG-IN</div>
          <div className=" h-full">
            <form
              className="  py-12 px-14 flex-col space-y-15 h-full"
              onSubmit={loginSubmitHandler}
            >
              <div>
                <input
                  type="text"
                  className="w-full h-12 mb-3 p-4"
                  placeholder="Email"
                  onChange={(e) => {
                    setLemail(e.target.value);
                  }}
                  value={lemail}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="w-full h-12 mb-3 p-4"
                  placeholder="password"
                  onChange={(e) => {
                    setLpassword(e.target.value);
                  }}
                  value={lpassword}
                />
              </div>
              <div>
                <input
                  type="submit"
                  className="w-full h-12 bg-stone-200 cursor-pointer mb-3"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
