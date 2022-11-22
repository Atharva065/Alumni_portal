import React, { useEffect } from "react";
import "./ImageScroller.css";

import SliderImg1 from "./Images/1.jpg";
import SliderImg2 from "./Images/2.jpg";
import SliderImg3 from "./Images/3.jpg";
import SliderImg4 from "./Images/4.jpg";
import SliderImg5 from "./Images/5.jpg";
import SliderImg6 from "./Images/6.jpg";
import SliderImg7 from "./Images/7.jpg";
export default function ImageScroller() {
  useEffect(() => {
    const interval = setInterval(() => {
      nextImg();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  let i = 0,
    sliderPos = 0;
  let sliderImgSrc = [
    SliderImg1,
    SliderImg2,
    SliderImg3,
    SliderImg4,
    SliderImg5,
    SliderImg6,
    SliderImg7,
  ];
  let imgSlider = [];
  for (i = 0; i < sliderImgSrc.length; i++) {
    imgSlider.push(
      <img src={sliderImgSrc[i]} className="sliderImgs" alt="Slider" />
    );
  }
  i = 0;
  return (
    <>
      <div id="ImageScroller" className="ImageScroller">
        <div className="container" id="imgSliderContainer">
          {imgSlider.map((item, index) => {
            return item;
          })}
          {/* <img src={SliderImg1} id="sliderImg" alt="Slider" />
          <img src={SliderImg1} id="sliderImgSmall" alt="Inside Slider" /> */}
        </div>
        <button className="prevNextBtn prevBtn" onClick={prevImg}>
          &#10096;
        </button>
        <button className="prevNextBtn nextBtn" onClick={nextImg}>
          &#10097;
        </button>
      </div>
    </>
  );
  function nextImg() {
    try {
      // var sliderImg = document.getElementById('sliderImg');
      // var sliderImgSmall = document.getElementById('sliderImgSmall');

      let imgSliderContainer = document.getElementById("imgSliderContainer");
      if (i === sliderImgSrc.length - 1) {
        i = 0;
        sliderPos = 0;
        imgSliderContainer.style.left = sliderPos.toString() + "vw";
        // sliderImgs[i].style.transform = rotateZ()
      } else {
        i = i + 1;
        sliderPos = sliderPos - 80;
        imgSliderContainer.style.left = sliderPos.toString() + "vw";
      }
    } catch (err) {}
  }
  function prevImg() {
    try {
      // var sliderImg = document.getElementById('sliderImg');
      // var sliderImgSmall = document.getElementById('sliderImgSmall');
      let imgSliderContainer = document.getElementById("imgSliderContainer");
      if (i === 0) {
        i = sliderImgSrc.length - 1;
        sliderPos = sliderImgSrc.length * -80 + 80;
        imgSliderContainer.style.left = sliderPos.toString() + "vw";
      } else {
        i = i - 1;
        sliderPos = sliderPos + 80;
        imgSliderContainer.style.left = sliderPos.toString() + "vw";
      }
    } catch (err) {}
  }
}
