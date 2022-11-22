import React, { useEffect } from "react";
import "./DesignedCarousel.css";
import SliderImg1 from "../About/Images/1.jpg";
import SliderImg2 from "../About/Images/2.jpg";
import SliderImg3 from "../About/Images/3.jpg";
import SliderImg4 from "../About/Images/4.jpg";
import SliderImg5 from "../About/Images/5.jpg";
import SliderImg6 from "../About/Images/6.jpg";
import SliderImg7 from "../About/Images/7.jpg";

export default function DesignedCarousel() {
  useEffect(() => {
    let CarouselImgs = document.getElementsByClassName("CarouselImgs");
    CarouselImgs[0].style.width = "60vw";
    CarouselImgs[0].style.height = "36vw";

    CarouselImgs[1].style.transformOrigin = "0% 100%";
    CarouselImgs[1].style.transform = "rotateZ(10deg)";
    CarouselImgs[1].style.width = "50vw";
    CarouselImgs[1].style.height = "30vw";

    let CarouselImgOut = document.getElementById("CarouselImgOut");
    CarouselImgOut.style.left = "18vw";

    const interval = setInterval(() => {
      nextImg();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  let i = 0,
    j = 0,
    sliderPos = 18,
    frontImgNo = 0;
  let carouselImgSrc = [
    SliderImg1,
    SliderImg2,
    SliderImg3,
    SliderImg4,
    SliderImg5,
    SliderImg6,
    SliderImg7,
  ];
  let imgSlider = [];
  for (i = 0; i < carouselImgSrc.length; i++) {
    imgSlider.push(
      <div className="PartitionImgContainer">
        <div className="SliderImgPartition"></div>
        <img src={carouselImgSrc[i]} className="CarouselImgs" alt="Slider" />
        <div className="SliderImgPartition"></div>
      </div>
    );
  }
  window.onload = () => {
    let CarouselImgs = document.getElementsByClassName("CarouselImgs");
    CarouselImgs[0].style.width = "60vw";
    CarouselImgs[0].style.height = "36vw";

    CarouselImgs[1].style.transformOrigin = "0% 100%";
    CarouselImgs[1].style.transform = "rotateZ(10deg)";
    CarouselImgs[1].style.width = "50vw";
    CarouselImgs[1].style.height = "30vw";

    let CarouselImgOut = document.getElementById("CarouselImgOut");
    CarouselImgOut.style.left = "18vw";
  };
  i = 0;

  return (
    <div className="CarouselOut">
      <div className="CarouselImgOut" id="CarouselImgOut">
        {imgSlider.map((item, index) => {
          return item;
        })}
      </div>
      <button className="prevNextBtn prevBtn" onClick={prevImg}>
        &#10096;
      </button>
      <button className="prevNextBtn nextBtn" onClick={nextImg}>
        &#10097;
      </button>
    </div>
  );

  function nextImg() {
    try {
      // frontImgNo = frontImgNo + 1;
      let CarouselImgs = document.getElementsByClassName("CarouselImgs");
      let CarouselImgOut = document.getElementById("CarouselImgOut");
      if (frontImgNo === carouselImgSrc.length - 1) {
        CarouselImgOut.style.opacity = "0";
        frontImgNo = 0;
        sliderPos = 18;
        CarouselImgOut.style.left = sliderPos.toString() + "vw";
        CarouselImgOut.style.opacity = "1";
      } else {
        frontImgNo = frontImgNo + 1;
        sliderPos = sliderPos - 54;
        CarouselImgOut.style.left = sliderPos.toString() + "vw";
      }
      for (j = 0; j < carouselImgSrc.length; j++) {
        if (j === frontImgNo) {
          CarouselImgs[j].style.transform = "rotateZ(0deg)";
          CarouselImgs[j].style.width = "60vw";
          CarouselImgs[j].style.height = "36vw";
        } else if (j === frontImgNo - 1) {
          CarouselImgs[j].style.transformOrigin = "100% 100%";
          CarouselImgs[j].style.transform = "rotateZ(-10deg)";
          CarouselImgs[j].style.width = "50vw";
          CarouselImgs[j].style.height = "30vw";
        } else if (j === frontImgNo + 1) {
          CarouselImgs[j].style.transformOrigin = "0% 100%";
          CarouselImgs[j].style.transform = "rotateZ(10deg)";
          CarouselImgs[j].style.width = "50vw";
          CarouselImgs[j].style.height = "30vw";
        } else {
          CarouselImgs[j].style.transform = "rotateZ(0deg)";
          CarouselImgs[j].style.width = "50vw";
          CarouselImgs[j].style.height = "30vw";
        }
      }
    } catch (err) {}
  }
  function prevImg() {
    try {
      // frontImgNo = frontImgNo - 1;
      let CarouselImgs = document.getElementsByClassName("CarouselImgs");
      let CarouselImgOut = document.getElementById("CarouselImgOut");
      if (frontImgNo === 0) {
        frontImgNo = carouselImgSrc.length - 1;
        sliderPos = -((carouselImgSrc.length - 1) * 54 + 64 - 82);
        CarouselImgOut.style.left = sliderPos.toString() + "vw";
      } else {
        frontImgNo = frontImgNo - 1;
        sliderPos = sliderPos + 54;
        CarouselImgOut.style.left = sliderPos.toString() + "vw";
      }
      for (j = 0; j < carouselImgSrc.length; j++) {
        if (j === frontImgNo) {
          CarouselImgs[j].style.transform = "rotateZ(0deg)";
          CarouselImgs[j].style.width = "60vw";
          CarouselImgs[j].style.height = "36vw";
        } else if (j === frontImgNo - 1) {
          CarouselImgs[j].style.transformOrigin = "100% 100%";
          CarouselImgs[j].style.transform = "rotateZ(-10deg)";
          CarouselImgs[j].style.width = "50vw";
          CarouselImgs[j].style.height = "30vw";
        } else if (j === frontImgNo + 1) {
          CarouselImgs[j].style.transformOrigin = "0% 100%";
          CarouselImgs[j].style.transform = "rotateZ(10deg)";
          CarouselImgs[j].style.width = "50vw";
          CarouselImgs[j].style.height = "30vw";
        } else {
          CarouselImgs[j].style.transform = "rotateZ(0deg)";
          CarouselImgs[j].style.width = "50vw";
          CarouselImgs[j].style.height = "30vw";
        }
      }
    } catch (err) {}
  }
}
