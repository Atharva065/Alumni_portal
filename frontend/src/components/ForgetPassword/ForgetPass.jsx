import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";

import "./forgetPass.css";
import ChangePass from "./ChangePass";

const ForgetPass = () => {
  const [visible, setVisible] = useState(false);
  const [credentials, setCredentials] = useState({ email: "" });

  const [loader, setLoader] = useState(false);
  const loaderCSS = css`
    position: fixed;
    top: 50%;
    left: 50%;
  `;

  async function forgetPassword() {
    setLoader(true);
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
        }),
      };
      const response = await fetch(
        // "http://localhost:4000/users/forgetPassword",
        `/users/forgetPassword`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      // localStorage.setItem("token", data.token);
      console.log(data);

      setLoader(false);
      setVisible(true);
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast.error("Email Id not valid", {
        position: toast.POSITION.TOP_CENTER,
      });
      setVisible(false);
    }
  }
  console.log(credentials);
  const routeChange = () => {
    if (credentials.email.length >= 9) {
      forgetPassword()
        .then(() => {
          setVisible(true);
          console.log("hiiiiii");
        })
        .catch(() => {
          setVisible(false);
          console.log("Error .............");
        });
    } else {
      toast.warn("Enter valid email", {
        position: toast.POSITION.TOP_CENTER,
      });
      setCredentials({ email: "" });
    }
  };
  console.log(credentials);
  return (
    <>
      {visible === false ? (
        <div className="forget-password-main">
          <ClipLoader
            color="#02023d"
            // size={100}
            css={loaderCSS}
            loading={loader}
          />
          <ToastContainer />
          <div className="forget-password">
            <h1>Forget password</h1>
            <p>Enter email</p>
            <form>
              <input
                type="email"
                name="email"
                id="input-email"
                placeholder="Enter email address"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    email: e.target.value,
                  })
                }
                required
                value={credentials.email}
              />
              <br />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  routeChange();
                }}
              >
                Send OTP
              </button>
            </form>
          </div>
        </div>
      ) : (
        <ChangePass {...credentials} />
      )}
    </>
  );
};

export default ForgetPass;
