import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { css } from "@emotion/react";
import "react-toastify/dist/ReactToastify.css";
import "./AdminSection.css";

const AdminSection = () => {
  const [credentials, setCredentials] = useState({
    email: "",
  });
  const [loader, setLoader] = useState(false);
  const loaderCSS = css`
    position: fixed;
    top: 50%;
    left: 50%;
  `;

  async function deleteUser(_id) {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        throw new Error();
      }
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        // `http://localhost:4000/user/delete?_id:${_id}`,
        `/user/delete?_id:${_id}`,
        requestOptions
      );
      if (!response.ok) {
        const error = new Error(response.error);
        throw error;
      }
      const data = await response.json();
      // console.log(data);
      // setWhoLogged(data);
      setLoader(false);
      console.log(data);
    } catch (error) {
      console.log("error");
      setLoader(false);
    }
  }
  return (
    <>
      <ClipLoader color="#02023d" size={50} css={loaderCSS} loading={loader} />
      <ToastContainer />
      <div className="admin-section">
        <div className="search-alumni">
          <div className="search-alumni-input">
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
          <div className="search-alumni-button">
            <button>Search</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSection;
