import React from "react";
import "./About.css";
// import ImageScroller from "./ImageScroller";
import DesignedCarousel from "../DesignedCarousel/DesignedCarousel";

export default function About() {
  return (
    <div style={{ background: "rgb(244, 249, 255)" }}>
      <h1 className="AboutHead">About RSCOE Alumni Portal </h1>
      <p className="AboutHeadText">
        The RSCOE Alumni portal shall serve as a platform to bridge the gap of
        student-alumni interaction driven by the ideals and values that shall
        ensure the upliftment of both present and future alumni with support to
        build a social, knowledge-based and motivational capital for RSCOE and
        its students.
      </p>
      <div className="VisionOut">
        <h2>VISION</h2>
        <p>
          “To be a values-based, internationally recognised institution that
          promotes quality education, research, innovation, and an
          entrepreneurial mindset while ensuring academic quality. ”
        </p>
      </div>
      <div className="VisionOut">
        <h2>MISSION</h2>
        <p>
          “The mission is to reach, engage, and serve all alumni and current
          students through networking to nurture a life-long emotional and
          intellectual connection between the college and its graduates, and
          also to improve industry-academic collaboration and communications,
          including public relations. ”
        </p>
      </div>
      {/* <ImageScroller /> */}
      <DesignedCarousel />
    </div>
  );
}
