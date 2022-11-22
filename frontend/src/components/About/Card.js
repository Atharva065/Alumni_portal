import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <h1>Awards and Achievements</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/img-10.jpg"
              text="National Award for Best Engineering College Principal 2020"
              label="Award"
              path="/services"
            />

            <CardItem
              src="images/img-11.jpg"
              text="Award for an Engineering College having Best Overall Performance"
              label="Award"
              path="/services"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-12.jpg"
              text="Football Champions 2019"
              label="Sports"
              path="/services"
            />
            <CardItem
              src="images/img-13.jpg"
              text="Table Tennis Winners 2019"
              label="Sports"
              path="/products"
            />
            <CardItem
              src="images/img-14.jpg"
              text="A-grade by NAAC"
              label="Award"
              path="/sign-up"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
