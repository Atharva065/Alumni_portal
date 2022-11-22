import React, { useState } from "react";
import { MdEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import { GoMarkGithub } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const OnClickProfile = () => {
  const location = useLocation();
  const [profileData] = useState(location.state);
  return (
    <>
      <div className="profile-section">
        <div className="profile-body">
          <div className="combine">
            <div className="img-section">
              <h1>
                {profileData.firstName}&nbsp;
                {profileData.lastName}
              </h1>
            </div>
            <div className="img-basic-info">
              <div className="img-basic-info-img">
                {profileData.avatar === undefined ? (
                  <img src="Images/avatar.jpg" alt="Avatar" />
                ) : (
                  <img
                    src={`data:image/jpeg;base64,${profileData.avatar}`}
                    alt="Avatar"
                  />
                )}
              </div>

              <div className="img-basic-info-info">
                <div className="icon-and-heading">
                  <h2>
                    {profileData.firstName}&nbsp;
                    {profileData.lastName}
                  </h2>
                </div>
                <h3>{profileData.profession}</h3>
                <div className="img-basic-info-info-contact">
                  <div>
                    <MdEmail /> &nbsp; {profileData.email}
                  </div>
                  <div>
                    <MdOutlinePhoneInTalk />
                    &nbsp; {profileData.contactNo}
                  </div>
                </div>
                <div className="img-basic-info-info-links">
                  <div>
                    <a
                      href={profileData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin />
                      &nbsp; Linkden
                    </a>
                  </div>
                  <div>
                    <a
                      href={profileData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GoMarkGithub />
                      &nbsp; Github
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-div">
            <div className="heading-icon">
              <h2>About</h2>
            </div>
            <div>
              <div className="about-me">
                <strong>About me : </strong> {profileData.about}
              </div>
              <hr />
              <div className="gender-dop">
                <div>
                  {" "}
                  <strong>Gender : </strong>
                  {profileData.gender}
                </div>
                <div>
                  {" "}
                  <strong>Date Of Birth : </strong> {profileData.dateOfBirth}
                </div>
              </div>
              <hr />
              <div className="about-city">
                <div>
                  {" "}
                  <strong>Current City : </strong> {profileData.currentCity}
                </div>
                <div>
                  {" "}
                  <strong>Current Country : </strong>{" "}
                  {profileData.currentCountry}
                </div>
              </div>
              <hr />
              <div className="about-past-city">
                <div>
                  <strong>Past City : </strong>
                  {profileData.pastCities !== { undefined } &&
                    profileData.pastCities.map((e, i) => {
                      return <p key={i}> {e.city},&nbsp;</p>;
                    })}
                </div>
                <div>
                  <strong>Past Country : </strong>
                  {profileData.pastCountries !== { undefined } &&
                    profileData.pastCountries.map((e, i) => {
                      return <p key={i}> {e.country},&nbsp;</p>;
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="education">
            <div className="heading-icon">
              <h2>Education</h2>
            </div>
            {profileData.education !== undefined &&
              profileData.education.map((e) => {
                return (
                  <>
                    <div className="education-div">
                      <div className="education-div-div">
                        <div className="">
                          <strong>College Name : </strong> {e.collegeName}
                        </div>
                        <div className="">
                          <strong> Course : </strong> {e.course}
                        </div>
                      </div>
                      <div className="education-div-div">
                        <div className="">
                          <strong>Filed Of Study :</strong>
                          {e.fieldOfStudy}
                        </div>
                        <div className="">
                          {" "}
                          <strong>Year Of Passing :</strong> {e.yearOfPassing}
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
          </div>
          <div className="work-experience">
            <div className="heading-icon">
              <h2>Work</h2>
            </div>
            {profileData.workExperience !== undefined &&
              profileData.workExperience.map((e) => {
                return (
                  <>
                    <div className="">
                      <div className="work-experience-div">
                        <div className="">
                          {" "}
                          <strong> Organization :</strong> {e.organization}
                        </div>
                        <div className="">
                          <strong>Position :</strong>
                          {e.position}
                        </div>
                      </div>
                      <div className="work-experience-div">
                        <div className="">
                          {" "}
                          <strong>Years of Experience :</strong>{" "}
                          {e.yearOfExperience}
                        </div>
                        <div className="">
                          {" "}
                          <strong>Field :</strong> {e.field}
                        </div>
                      </div>
                      <div className="work-experience-div">
                        <div className="">
                          {" "}
                          <strong>Start Date : </strong> {e.startDate}
                        </div>
                        <div className="">
                          <strong>End Date : </strong>
                          {e.endDate}
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnClickProfile;
