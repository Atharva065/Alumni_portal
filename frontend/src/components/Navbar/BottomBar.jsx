import React from "react";
import "./BottomBar.css";
import LogoHome from "./LogoHome.svg";
import LogoFindAlumni from "./LogoFindAlumni.svg";
import LogoFeed from "./LogoFeed.svg";
import LogoAlumniTalk from "./LogoAlumniTalk.svg";
// import LogoAboutUs from "./LogoAboutUs.svg";
import LogoEvents from "./LogoEvents.svg";
import { Link } from "react-router-dom";

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
  var BottomBarLinks = document.getElementsByClassName("BottomBarLinks");
  var LeftNavLinks = document.getElementsByClassName("LeftNavLinks");
  for (let i = 1; i < 6; i++) {
    if (i === colorIndex) {
      BottomBarLinks[i - 1].style.filter =
        "invert(49%) sepia(88%) saturate(3480%) hue-rotate(164deg) brightness(99%) contrast(101%)";
      BottomBarLinks[i - 1].style.borderTop =
        "0.2vw solid rgba(2, 117, 177, 1)";
      BottomBarLinks[i - 1].style.color = "rgba(2, 117, 177, 1)";
      LeftNavLinks[i - 1].style.filter =
        "invert(49%) sepia(88%) saturate(3480%) hue-rotate(164deg) brightness(99%) contrast(101%)";
      LeftNavLinks[i - 1].style.borderBottom =
        "0.2vw solid rgba(2, 117, 177, 1)";
      LeftNavLinks[i - 1].style.color = "rgba(2, 117, 177, 1)";
    } else {
      BottomBarLinks[i - 1].style.filter = "none";
      BottomBarLinks[i - 1].style.borderTop = "none";
      BottomBarLinks[i - 1].style.color = "black";
      LeftNavLinks[i - 1].style.filter = "none";
      LeftNavLinks[i - 1].style.borderBottom = "none";
      LeftNavLinks[i - 1].style.color = "black";
    }
  }
};
window.onload = changeColor("1", "0");

window.onscroll = function (e) {
  // console.log(this.oldScroll > this.scrollY);
  if (this.oldScroll > this.scrollY) {
    document.getElementsByClassName("BottomBar")[0].style.bottom = "0vw";
  } else {
    document.getElementsByClassName("BottomBar")[0].style.bottom = "-17vw";
  }
  this.oldScroll = this.scrollY;
};
export default function BottomBar() {
  return (
    <div className="BottomBar">
      <Link to="/" className="BottomBarLinks" onClick={changeColor(["1", "1"])}>
        <img src={LogoHome} alt="homeIcon" />
        <span>HOME</span>
      </Link>
      <Link
        to="/find_alumni"
        className="BottomBarLinks"
        onClick={changeColor(["2", "1"])}
      >
        <img src={LogoFindAlumni} alt="findIcon" />
        <span>FIND ALUMNI</span>
      </Link>
      <Link
        to="/feed"
        className="BottomBarLinks"
        onClick={changeColor(["3", "1"])}
      >
        <img src={LogoFeed} alt="feedIcon" />
        <span>FEED</span>
      </Link>
      <Link
        to="/alumni_talk"
        className="BottomBarLinks"
        onClick={changeColor(["4", "1"])}
      >
        <img src={LogoAlumniTalk} alt="talkIcon" />
        <span>ALUMNI TALK</span>
      </Link>
      <Link
        to="/events"
        className="BottomBarLinks"
        onClick={changeColor(["5", "1"])}
      >
        <img src={LogoEvents} alt="eventIcon" />
        <span>EVENTS</span>
      </Link>
    </div>
  );
}
