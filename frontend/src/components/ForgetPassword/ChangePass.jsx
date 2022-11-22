import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
const ChangePass = ({ ...prop }) => {
  console.log(prop.email);
  const [changePassword, setChangePassword] = useState({
    newPass: "",
    confirmPass: "",
    otp: "",
  });
  const [loader, setLoader] = useState(false);
  const loaderCSS = css`
    position: fixed;
    top: 50%;
    left: 50%;
  `;
  const history = useHistory();

  const updateProfile = async (info) => {
    try {
      setLoader(true);
      const token = info.token;

      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: info.password,
        }),
      };
      const response = await fetch(
        // "http://localhost:4000/users/me",
        `/users/me`,
        requestOptions
      );
      await response.json();

      setLoader(false);
    } catch (error) {
      toast.error("Error...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setLoader(false);
      console.log(error);
    }
  };
  async function verifyOTP() {
    setLoader(true);
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: prop.email,
          otp: changePassword.otp,
        }),
      };
      const response = await fetch(
        // "http://localhost:4000/users/verifyOTP",
        `/users/verifyOTP`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Error......");
      }
      const data = await response.json();

      await updateProfile({
        token: data.token,
        password: changePassword.newPass,
      });
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast.error("OTP Not match", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  const routeChange = () => {
    if (changePassword.newPass !== changePassword.confirmPass) {
      toast.warn("Password not match", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (
      changePassword.newPass === "" ||
      changePassword.confirmPass === "" ||
      changePassword.otp.length < 4
    ) {
      toast.warn("Enter Valid fields", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (
      changePassword.newPass === changePassword.confirmPass &&
      changePassword.newPass.length < 7
    ) {
      toast.warn("Password must be greater then 7 lenght", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    verifyOTP().then(() => {
      toast.success("Password change ", {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        history.push("/signIn");
      }, 3000);
    });
  };
  return (
    <>
      <div className="forget-password-main">
        <ClipLoader color="#02023d" css={loaderCSS} loading={loader} />
        <ToastContainer />
        <div className="forget-password">
          <p>Enter new password</p>
          <form>
            <input
              required
              name="newPass"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setChangePassword({
                  ...changePassword,
                  newPass: e.target.value,
                });
              }}
            />
            <br />
            <p>Re-enter password</p>

            <input
              required
              name="confirmPass"
              placeholder="Confirm Password"
              type="password"
              onChange={(e) => {
                setChangePassword({
                  ...changePassword,
                  confirmPass: e.target.value,
                });
              }}
            />
            <br />
            <p>Enter OTP</p>

            <input
              required
              name="otp"
              placeholder="OTP"
              type="number"
              onChange={(e) => {
                setChangePassword({
                  ...changePassword,
                  otp: e.target.value,
                });
              }}
            />
            <br />
            <button
              onClick={(e) => {
                e.preventDefault();
                routeChange();
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePass;
