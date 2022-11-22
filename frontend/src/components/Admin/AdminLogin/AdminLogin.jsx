import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { css } from "@emotion/react";
import "react-toastify/dist/ReactToastify.css";
import "./AdminLogin.css";
const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const loaderCSS = css`
    position: fixed;
    top: 50%;
    left: 50%;
  `;
  async function loginUser() {
    setLoader(true);
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      };
      const response = await fetch(
        // "http://localhost:4000/admin/login",
        "/admin/login",
        requestOptions
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(data);
      toast.success("Login Successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoader(false);
      // history.push("");
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast.error("Error", { position: toast.POSITION.TOP_CENTER });
    }
  }
  // console.log(credentials);
  return (
    <>
      <ClipLoader color="#02023d" size={50} css={loaderCSS} loading={loader} />
      <ToastContainer />
      <div className="signin">
        <form>
          <div className="signin-component">
            <div className="signin-headding">
              <h2>Sign In</h2>
            </div>
            <div className="signin-email">
              <p>Email address*</p>
              <input
                type="email"
                required
                placeholder="Enter Email"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    email: e.target.value,
                  })
                }
                value={credentials.email}
              />
            </div>
            <div className="signin-password">
              <p>Password*</p>
              <input
                type="password"
                required
                placeholder="Enter Password"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    password: e.target.value,
                  })
                }
                value={credentials.password}
              />
            </div>
            <div className="signin-button">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  loginUser();
                }}
              >
                <span>Sign in</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
