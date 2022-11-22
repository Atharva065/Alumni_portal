import React from "react";
import { Link } from "react-router-dom";
import "./PlatformInfo.css";
const PlarformInfo = () => {
  return (
    <>
      <div className="explore-heading">
        <h1>Welcome to Alumni Portal</h1>
      </div>
      <div className="main-explore">
        <div className="explore-first-half">
          <div className="explore-links">
            <Link to="/find_alumni">
              <h3>Alumni Directory</h3>
              <p>
                Here, you can find alumni from our college, learn more about
                them, and connect with them.
              </p>
            </Link>
          </div>
          <div className="explore-links">
            <Link to="/profilePage">
              <h3>Your Alumni Profile</h3>
              <p>
                You may review your individual profile's status and modify it
                here.
              </p>
            </Link>
          </div>
        </div>
        <div className="explore-second-half">
          <div className="explore-links">
            <Link to="alumni_talk">
              <h3>Alumni Talk</h3>
              <p>
                You can learn more about placement, study tools, interview
                preparation.
              </p>
            </Link>
          </div>
          <div className="explore-links">
            <Link to="/feed">
              <h3>Updates By Alumni</h3>
              <p>
                You can browse alumni reviews here and post your own as well.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlarformInfo;
