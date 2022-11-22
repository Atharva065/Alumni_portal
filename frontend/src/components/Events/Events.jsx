import React from "react";
import { BsCalendar2EventFill } from "react-icons/bs";
import eventsApi from "../../API/eventsApi";
import Popup from "reactjs-popup";

import "./Events.css";

const contentStyle = {
  maxWidth: "100%",
  width: "70%",
};
const Events = () => {
  return (
    <>
      <div className="events-main">
        {eventsApi.map((e) => {
          return (
            <div className="events" key={e.eventName}>
              <h3>{e.eventName}</h3>
              {/* <h5>
                <span>
                  <IoLocationSharp  className="location-svg"/>
                </span>{" "}
                {e.eventLocation}
              </h5> */}
              <h6>
                <span>
                  <BsCalendar2EventFill />
                </span>{" "}
                {e.eventDate}
              </h6>
              <p>
                {e.eventDescription.slice(0, 150)}
                <Popup
                  trigger={
                    <span className="event-read-more">... Read more</span>
                  }
                  modal
                  contentStyle={contentStyle}
                >
                  {(close) => (
                    <div className="modal">
                      {/* // eslint-disable-next-line */}
                      <a href className="close" onClick={close}>
                        &times;
                      </a>
                      <div className="event-heading">
                        {/* <h3>Event Name</h3> */}
                        <h3>{e.eventName}</h3>
                        <div className="event-date">
                          <span>
                            <BsCalendar2EventFill />
                          </span>{" "}
                          {e.eventDate}
                        </div>
                      </div>
                      {/* <div className="event-location">
                        <span>
                          <IoLocationSharp  />
                        </span>{" "}
                        {e.eventLocation}
                      </div> */}
                      <div className="event-description">
                        {/* <img src="images/Events.jpg" alt="eventImg" /> */}
                        <img src={e.eventimage} alt="" />
                        <div className="event-description-p">
                          <p>{e.eventDescription}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Popup>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Events;
