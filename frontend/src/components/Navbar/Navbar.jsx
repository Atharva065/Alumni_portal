import React, { useContext, useState } from "react";
import "./Navbar.css";
import LogoRSCOE from "./LogoRSCOE.png";
import User from "./User.png";
import LogoHome from "./LogoHome.svg";
import LogoFindAlumni from "./LogoFindAlumni.svg";
import LogoFeed from "./LogoFeed.svg";
import LogoAlumniTalk from "./LogoAlumniTalk.svg";
import LogoAboutUs from "./LogoAboutUs.svg";
import LogoEvents from "./LogoEvents.svg";
import { Link, useHistory, useLocation } from "react-router-dom";
import userContext from "../../context/userContext";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const changeColor = (gotColorIndex) => () => {
  console.log("Change Color Call");
  if (sessionStorage.getItem("colorIndex") === null) {
    console.log("Not Set");
    sessionStorage.setItem("colorIndex", "1");
  } else {
    if (gotColorIndex[1] === "1") {
      console.log("Set" + sessionStorage.getItem("colorIndex"));
      sessionStorage.setItem("colorIndex", String(gotColorIndex[0]));
    }
  }
  var colorIndex = parseInt(sessionStorage.getItem("colorIndex"));
  console.log(colorIndex);
  var LeftNavLinks = document.getElementsByClassName("LeftNavLinks");
  var BottomBarLinks = document.getElementsByClassName("BottomBarLinks");
  for (let i = 1; i < 6; i++) {
    if (i === colorIndex) {
      LeftNavLinks[i - 1].style.filter =
        "invert(49%) sepia(88%) saturate(3480%) hue-rotate(164deg) brightness(99%) contrast(101%)";
      LeftNavLinks[i - 1].style.borderBottom =
        "0.2vw solid rgba(2, 117, 177, 1)";
      LeftNavLinks[i - 1].style.color = "rgba(2, 117, 177, 1)";
      BottomBarLinks[i - 1].style.filter =
        "invert(49%) sepia(88%) saturate(3480%) hue-rotate(164deg) brightness(99%) contrast(101%)";
      BottomBarLinks[i - 1].style.borderTop =
        "0.2vw solid rgba(2, 117, 177, 1)";
      BottomBarLinks[i - 1].style.color = "rgba(2, 117, 177, 1)";
    } else {
      LeftNavLinks[i - 1].style.filter = "none";
      LeftNavLinks[i - 1].style.borderBottom = "none";
      LeftNavLinks[i - 1].style.color = "black";
      BottomBarLinks[i - 1].style.filter = "none";
      BottomBarLinks[i - 1].style.borderTop = "none";
      BottomBarLinks[i - 1].style.color = "black";
    }
  }
};

window.onload = changeColor("1", "0");

let NavbarProfileDropDown = document.getElementsByClassName(
  "NavbarProfileDropDown"
);
let viewWidth = window.matchMedia("(max-width: 720px)");

function NavbarDropDown() {
  if (viewWidth.matches) {
    if (
      NavbarProfileDropDown[0].style.visibility === "hidden" ||
      NavbarProfileDropDown[0].style.visibility === ""
    ) {
      NavbarProfileDropDown[0].style.visibility = "visible";
      // NavbarProfileDropDown[0].style.width = "50vw";
      NavbarProfileDropDown[0].style.height = "23vw";
    } else {
      // NavbarProfileDropDown[0].style.width = "0vw";
      NavbarProfileDropDown[0].style.height = "0vw";
      NavbarProfileDropDown[0].style.visibility = "hidden";
    }
  } else {
    if (
      NavbarProfileDropDown[0].style.visibility === "hidden" ||
      NavbarProfileDropDown[0].style.visibility === ""
    ) {
      NavbarProfileDropDown[0].style.visibility = "visible";
      // NavbarProfileDropDown[0].style.width = "10vw";
      NavbarProfileDropDown[0].style.height = "7vw";
    } else {
      // NavbarProfileDropDown[0].style.width = "0vw";
      NavbarProfileDropDown[0].style.height = "0vw";
      NavbarProfileDropDown[0].style.visibility = "hidden";
    }
  }
}

window.addEventListener("click", function (e) {
  if (NavbarProfileDropDown[0].contains(e.target)) {
    // Clicked inside the box
    console.log("Inside menu");
  } else {
    // Clicked outside the box
    if (
      NavbarProfileDropDown[0].style.visibility === "visible" &&
      !document.getElementsByClassName("NavbarProfileImg")[0].contains(e.target)
    ) {
      // NavbarProfileDropDown[0].style.width = "0vw";
      NavbarProfileDropDown[0].style.height = "0vw";
      NavbarProfileDropDown[0].style.visibility = "hidden";
    }
  }
});

export default function Navbar() {
  const location = useLocation();
  console.log(location);
  const s = useContext(userContext);
  console.log(s);
  const [loader, setLoader] = useState(false);

  const loaderCSS = css`
    position: fixed;
    top: 50%;
    left: 50%;
  `;
  const history = useHistory();

  async function logoutUser() {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      if (token == null) {
        setLoader(false);
        throw new Error();
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await fetch(
        // "http://localhost:4000/users/logoutAll",
        `/users/logoutAll`,
        requestOptions
      );
      localStorage.removeItem("token");
      s.changeUser({});
      s.changeLogin(false);
      setLoader(false);
      toast.success("Logout Successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      history.push("/");
    } catch (error) {
      setLoader(false);
      history.push("/");
    }
  }
  if (s.login === true) {
    return (
      <>
        <ClipLoader color="#02023d" css={loaderCSS} loading={loader} />

        <div className="Navbar">
          <div className="NavbarProfileDropDown">
            <Link
              id="DropDownLinks1"
              className="DropDownLinks"
              to="/profilePage"
            >
              My Profile
            </Link>
            <Link
              id="DropDownLinks2"
              className="DropDownLinks"
              onClick={() => {
                logoutUser();
              }}
            >
              Sign Out
            </Link>
          </div>
          <div className="LeftNavOut">
            <Link to="/">
              <img className="LogoRSCOE" src={LogoRSCOE} alt="collegeLogo" />
            </Link>

            <div className="LeftNav">
              <Link
                to="/"
                id="Navlink1"
                className="LeftNavLinks"
                style={
                  location.pathname === "/"
                    ? {
                        filter:
                          "invert(49%) sepia(88%) saturate(3480%) hue-rotate(164deg) brightness(99%) contrast(101%)",
                        borderBottom: "0.2vw solid rgba(2, 117, 177, 1)",
                        color: "rgba(2, 117, 177, 1)",
                      }
                    : {
                        filter: "none",
                        borderBottom: "none",
                        color: "black",
                      }
                }
              >
                <img src={LogoHome} alt="homeIcon" />
                <span>HOME</span>
              </Link>
              <Link
                to="/find_alumni"
                id="Navlink2"
                className="LeftNavLinks"
                style={
                  location.pathname === "/find_alumni"
                    ? {
                        filter:
                          "invert(49%) sepia(88%) saturate(3480%) hue-rotate(164deg) brightness(99%) contrast(101%)",
                        borderBottom: "0.2vw solid rgba(2, 117, 177, 1)",
                        color: "rgba(2, 117, 177, 1)",
                      }
                    : {
                        filter: "none",
                        borderBottom: "none",
                        color: "black",
                      }
                }
              >
                <img src={LogoFindAlumni} alt="LogoFindAlumni" />
                <span>FIND ALUMNI</span>
              </Link>
              <Link
                to="/feed"
                id="Navlink3"
                className="LeftNavLinks"
                style={
                  location.pathname === "/feed"
                    ? {
                        filter:
                          "invert(49%) sepia(88%) saturate(3480%) hue-rotate(164deg) brightness(99%) contrast(101%)",
                        borderBottom: "0.2vw solid rgba(2, 117, 177, 1)",
                        color: "rgba(2, 117, 177, 1)",
                      }
                    : {
                        filter: "none",
                        borderBottom: "none",
                        color: "black",
                      }
                }
              >
                <img src={LogoFeed} alt="feedIcon" />
                <span>FEED</span>
              </Link>
              <Link
                to="/alumni_talk"
                id="Navlink4"
                className="LeftNavLinks"
                style={
                  location.pathname === "/alumni_talk"
                    ? {
                        filter:
                          "invert(49%) sepia(88%) saturate(3480%) hue-rotate(164deg) brightness(99%) contrast(101%)",
                        borderBottom: "0.2vw solid rgba(2, 117, 177, 1)",
                        color: "rgba(2, 117, 177, 1)",
                      }
                    : {
                        filter: "none",
                        borderBottom: "none",
                        color: "black",
                      }
                }
              >
                <img src={LogoAlumniTalk} alt="talkIcon" />
                <span>ALUMNI TALK</span>
              </Link>
              <Link
                to="/events"
                id="Navlink5"
                className="LeftNavLinks"
                style={
                  location.pathname === "/events"
                    ? {
                        filter:
                          "invert(49%) sepia(88%) saturate(3480%) hue-rotate(164deg) brightness(99%) contrast(101%)",
                        borderBottom: "0.2vw solid rgba(2, 117, 177, 1)",
                        color: "rgba(2, 117, 177, 1)",
                      }
                    : {
                        filter: "none",
                        borderBottom: "none",
                        color: "black",
                      }
                }
              >
                <img src={LogoEvents} alt="eventIcon" />
                <span>EVENTS</span>
              </Link>

              <Link to="/about" className="LeftNavLinks">
                <img src={LogoAboutUs} alt="" />
                <span>ABOUT</span>
              </Link>
            </div>
          </div>
          <div className="RightNavOut">
            <Link className="NavbarProfileImg" onClick={NavbarDropDown}>
              <p>{`${s.user.firstName} ${s.user.lastName}`}</p>
              {s.user.avatar ? (
                <img
                  src={`data:image/jpeg;base64,${s.user.avatar}`}
                  alt="userIcon"
                />
              ) : (
                <img src={User} alt="userIcon" />
              )}
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <ClipLoader
          color="#02023d"
          // size={100}
          css={loaderCSS}
          loading={loader}
        />
        {/* <ToastContainer /> */}

        <div className="Navbar">
          <div className="LeftNavOut">
            <Link to="/">
              <img className="LogoRSCOE" src={LogoRSCOE} alt="logo" />
            </Link>
            <div className="LeftNav">
              <Link
                id="Navlink1"
                className="LeftNavLinks"
                to="/"
                onClick={changeColor(["1", "1"])}
              >
                <img src={LogoHome} alt="homeImg" />

                <span>HOME</span>
              </Link>
              <Link
                to="/find_alumni"
                id="Navlink2"
                className="LeftNavLinks"
                onClick={changeColor(["2", "1"])}
              >
                <img src={LogoFindAlumni} alt="LogoFindAlumni" />
                <span>FIND ALUMNI</span>
              </Link>
              <Link
                to="/feed"
                id="Navlink3"
                className="LeftNavLinks"
                onClick={changeColor(["3", "1"])}
              >
                <img src={LogoFeed} alt="feedIcon" />
                <span>FEED</span>
              </Link>
              <Link
                to="/alumni_talk"
                id="Navlink4"
                className="LeftNavLinks"
                onClick={changeColor(["4", "1"])}
              >
                <img src={LogoAlumniTalk} alt="talkIcon" />
                <span>ALUMNI TALK</span>
              </Link>
              <Link
                to="/events"
                id="Navlink5"
                className="LeftNavLinks"
                onClick={changeColor(["5", "1"])}
              >
                <img src={LogoEvents} alt="eventIcon" />
                <span>EVENTS</span>
              </Link>
              <Link
                to="/about"
                className="LeftNavLinks"
                onClick={changeColor(["6", "1"])}
              >
                <img src={LogoAboutUs} alt="" />
                <span>ABOUT</span>
              </Link>
            </div>
          </div>
          <div className="RightNavOut">
            <Link to="/signUp" className="SignInUpClass">
              SIGN UP
            </Link>
            <p className="SignInUpPartition"></p>
            <Link to="/signIn" className="SignInUpClass">
              SIGN IN
            </Link>
          </div>
        </div>
      </>
    );
  }
}
