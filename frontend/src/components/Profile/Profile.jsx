import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import {
  MdEmail,
  MdOutlinePhoneInTalk,
  MdAddBox,
  MdDelete,
  MdCameraEnhance,
  MdUploadFile,
} from "react-icons/md";
import { GoMarkGithub } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa";
import { Buffer } from "buffer";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
import { Modal } from "react-responsive-modal";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "react-responsive-modal/styles.css";
import userContext from "../../context/userContext";

const Profile = () => {
  const iconStyle = {
    color: "#0077B5",
    fontSize: "1.7em",
  };

  const iconStyle2 = {
    color: "white",
    fontSize: "1.7em",
  };

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    linkedin: "",
    github: "",
    profession: "",
    email: "",
    dateOfBirth: "",
    contactNo: "",
    currentCity: "",
    currentCountry: "",
    pastCities: [],
    pastCountries: [],
    education: [],
    about: "",
    workExperience: [],
  });

  const [basicinfo, setBasicinfo] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    contactNo: "",
    linkedin: "",
    github: "",
  });

  const [aboutInfo, setAboutInfo] = useState({
    about: "",
    gender: "male",
    dateOfBirth: "",
    currentCity: "",
    currentCountry: "",
    pastCities: [],
    pastCountries: [],
  });
  const [aboutInfoDumy, setAboutInfoDumy] = useState({
    about: "",
    gender: "male",
    dateOfBirth: "",
    currentCity: "",
    currentCountry: "",
    pastCities: "",
    pastCountries: "",
  });
  const [educationInfo, setEducationInfo] = useState([]);
  const [educationInfoObject, setEducationInfoObject] = useState({
    collegeName: "",
    course: "",
    fieldOfStudy: "",
    yearOfPassing: "",
  });
  const [workInfo, setWorkInfo] = useState([]);
  const [workInfoObject, setWorkInfoObject] = useState({
    organization: "",
    position: "",
    yearOfExperience: "",
    startDate: "",
    endDate: "",
    field: "",
  });
  const [basicModel, setBasicModel] = useState(false);
  const [aboutModel, setAboutModel] = useState(false);
  const [educationModel, setEducationModel] = useState(false);
  const [workModel, setWorkModel] = useState(false);
  const [photoModel, setPhotoModel] = useState(false);
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState("");
  const [photo, setPhoto] = useState("");
  const history = useHistory();
  const s = useContext(userContext);
  const loaderCSS = css`
    position: fixed;
    top: 50%;
    left: 50%;
  `;
  const [postData, setPostData] = useState([]);
  async function getUserProfile() {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        throw new Error();
      }
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        // "http://localhost:4000/users/me",
        `/users/me`,
        requestOptions
      );
      if (!response.ok) {
        const error = new Error(response.error);
        throw error;
      }
      const data = await response.json();
      setProfileData({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        linkedin: data.linkedin,
        github: data.github,
        profession: data.profession,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        contactNo: data.contactNo,
        currentCity: data.currentCity,
        currentCountry: data.currentCountry,
        pastCities: data.pastCities,
        pastCountries: data.pastCountries,
        education: data.education,
        about: data.about,
        workExperience: data.workExperience,
      });
      console.log(data);
      setLoader(false);
      return data;
    } catch (error) {
      history.push("/signin");
      console.log("error");
      setLoader(false);
    }
  }
  useEffect(() => {
    if (s.login === false) {
      getUserProfile().then((data) => {
        if (!data) {
          history.push("/signin");
          return;
        }
        s.changeUser(data);
        // console.log(data);
        setProfileData({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          linkedin: data.linkedin,
          github: data.github,
          profession: data.profession,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          contactNo: data.contactNo,
          currentCity: data.currentCity,
          currentCountry: data.currentCountry,
          pastCities: data.pastCities,
          pastCountries: data.pastCountries,
          education: data.education,
          about: data.about,
          workExperience: data.workExperience,
        });
        s.changeLogin(true);
        setLoader(false);
      });
    }
    // eslint-disable-next-line
  }, []);
  const updateProfile = async (updatedData) => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      if (token == null) {
        setLoader(false);
        throw new Error();
      }
      console.log(updatedData);
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      };
      const response = await fetch(
        // "http://localhost:4000/users/me",
        `/users/me`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      s.changeUser(data);
      setProfileData({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        linkedin: data.linkedin,
        github: data.github,
        profession: data.profession,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        contactNo: data.contactNo,
        currentCity: data.currentCity,
        currentCountry: data.currentCountry,
        pastCities: data.pastCities,
        pastCountries: data.pastCountries,
        education: data.education,
        about: data.about,
        workExperience: data.workExperience,
      });

      setLoader(false);
      // return data;
    } catch (error) {
      toast.error("Error...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setLoader(false);
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      if (token == null) {
        setLoader(false);
        throw new Error("Please Login");
      }
      // console.log(updatedData);
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(updatedData),
      };
      const response = await fetch(
        // "http://localhost:4000/users/me/myPost",
        `/users/me/myPost`,
        requestOptions
      );
      const data = await response.json();
      // console.log(data, "🔥🔥🔥");
      const data2 = data.map((e) => {
        if (e.post.photo) {
          e.post.photo = new Buffer.from(e.post.photo).toString("base64");
        }
        if (e.post.avatar) {
          e.post.avatar = new Buffer.from(e.post.avatar).toString("base64");
        }
        return e;
      });
      setPostData([...data2]);
      setLoader(false);
      // return data;
    } catch (error) {
      toast.error("Error...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setLoader(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (s.login === true)
      setProfileData({
        firstName: s.user.firstName,
        lastName: s.user.lastName,
        gender: s.user.gender,
        linkedin: s.user.linkedin,
        github: s.user.github,
        profession: s.user.profession,
        email: s.user.email,
        dateOfBirth: s.user.dateOfBirth,
        contactNo: s.user.contactNo,
        currentCity: s.user.currentCity,
        currentCountry: s.user.currentCountry,
        pastCities: s.user.pastCities,
        pastCountries: s.user.pastCountries,
        education: s.user.education,
        about: s.user.about,
        workExperience: s.user.workExperience,
      });
    getPhoto();
    getPosts();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setBasicinfo({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      profession: profileData.profession,
      contactNo: profileData.contactNo,
      linkedin: profileData.linkedin,
      github: profileData.github,
    });
    setAboutInfoDumy({
      about: profileData.about,
      gender: profileData.gender,
      dateOfBirth: profileData.dateOfBirth,
      currentCity: profileData.currentCity,
      currentCountry: profileData.currentCountry,
      pastCities: profileData.pastCities
        .map((e) => {
          return e.city;
        })
        .join(","),
      pastCountries: profileData.pastCountries
        .map((e) => {
          return e.country;
        })
        .join(","),
    });
    setEducationInfo([...profileData.education]);
    setWorkInfo([...profileData.workExperience]);
  }, [profileData]);
  // console.log(workInfoObject);
  const updateProfilePhoto = async (e) => {
    // console.log(e);
    setFile(e);
  };
  // console.log(file);
  const uploadPhoto = async () => {
    setPhotoModel(false);
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        throw new Error();
      }
      if (file === "" || file === undefined || file === null) {
        throw new Error();
      }
      const formData = new FormData();
      formData.append("avatar", file[0]);
      // console.log(formData);
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };
      const response = await fetch(
        // "http://localhost:4000/users/me/avatar",
        `/users/me/avatar`,
        requestOptions
      );
      if (!response.ok) {
        const error = new Error(response.error);
        throw error;
      }
      console.log(response);
      getPhoto();
      toast.success("Profile Photo Updated", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setLoader(false);
    } catch (error) {
      // console.log(error);
      toast.error("Error... Try after Some time", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setLoader(false);
    }
  };
  const getPhoto = async () => {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        throw new Error();
      }
      const requestOptions = {
        method: "GET",
        headers: {
          // "Content-Type": "image/png",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        // "http://localhost:4000/users/me/avatar",
        `/users/me/avatar`,
        requestOptions
      );
      // console.log(response);
      if (!response.ok) {
        const error = new Error(response.error);
        throw error;
      }
      // console.log(response);

      const data = await response.blob();
      const [res, err] = [URL.createObjectURL(data), null];
      console.log(err);

      setPhoto(res);
      setLoader(false);
    } catch (error) {
      // toast.error("Error... Try after Some time", {
      // 	position: toast.POSITION.TOP_CENTER,
      // 	autoClose: 5000,
      // });
      console.log("error");
      setLoader(false);
    }
  };
  const deletePhoto = async () => {
    setPhotoModel(false);
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        throw new Error();
      }
      const requestOptions = {
        method: "DELETE",
        headers: {
          // "Content-Type": "image/png",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        // "http://localhost:4000/users/me/avatar",
        `/users/me/avatar`,
        requestOptions
      );
      if (!response.ok) {
        const error = new Error(response.error);
        throw error;
      }
      console.log(response);
      setPhoto("");
      toast.success("Profile Photo Deleted", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setLoader(false);
    } catch (error) {
      toast.error("Error... Try after Some time", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      console.log("error");
      setLoader(false);
    }
  };
  const deletePost = async (id) => {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        throw new Error();
      }
      const requestOptions = {
        method: "DELETE",
        headers: {
          // "Content-Type": "image/png",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        // `http://localhost:4000/users/me/post/${id}`,
        `/users/me/post/${id}`,
        requestOptions
      );
      if (!response.ok) {
        const error = new Error(response.error);
        throw error;
      }
      console.log(response);
      const data = postData.filter((e) => {
        return e._id !== id;
      });
      console.log(data);
      setPostData(data);
      setLoader(false);
      toast.success("Post deleted", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } catch (error) {
      // toast.error("Error... Try after Some time", {
      // 	position: toast.POSITION.TOP_CENTER,
      // 	autoClose: 5000,
      // });
      console.log("error");
      setLoader(false);
    }
  };
  // console.log(photo);
  return (
    <>
      <ToastContainer />

      <ClipLoader
        color="#02023d"
        // size={100}
        css={loaderCSS}
        loading={loader}
      />
      <Modal open={basicModel} onClose={() => setBasicModel(false)} center>
        <div className="basic-info">
          <input
            type="text"
            placeholder="Enter First Name"
            onChange={(e) =>
              setBasicinfo({
                ...basicinfo,
                firstName: e.target.value,
              })
            }
            value={basicinfo.firstName}
          />
          <input
            type="text"
            placeholder="Enter Last Name"
            onChange={(e) =>
              setBasicinfo({
                ...basicinfo,
                lastName: e.target.value,
              })
            }
            value={basicinfo.lastName}
          />
          <input
            type="text"
            placeholder="Enter Profession"
            onChange={(e) =>
              setBasicinfo({
                ...basicinfo,
                profession: e.target.value,
              })
            }
            value={basicinfo.profession}
          />
          <input
            type="text"
            placeholder="Enter Contact Number"
            onChange={(e) =>
              setBasicinfo({
                ...basicinfo,
                contactNo: e.target.value,
              })
            }
            value={basicinfo.contactNo}
          />
          <input
            type="text"
            placeholder="Enter Linkden URL"
            onChange={(e) =>
              setBasicinfo({
                ...basicinfo,
                linkedin: e.target.value,
              })
            }
            value={basicinfo.linkedin}
          />
          <input
            type="text"
            placeholder="Enter Github URL"
            onChange={(e) =>
              setBasicinfo({
                ...basicinfo,
                github: e.target.value,
              })
            }
            value={basicinfo.github}
          />
          <div>
            <button
              onClick={() => {
                setBasicModel(false);
                if (
                  basicinfo.firstName === "" ||
                  basicinfo.firstName === undefined ||
                  basicinfo.lastName === "" ||
                  basicinfo.lastName === undefined
                ) {
                  toast.error("Plese enter valid inputs", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                  });
                  return;
                }
                updateProfile(basicinfo);
              }}
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setBasicinfo({
                  firstName: "",
                  lastName: "",
                  profession: "",
                  contactNo: "",
                  linkedin: "",
                  github: "",
                });
              }}
            >
              Clear Changes
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={aboutModel} onClose={() => setAboutModel(false)} center>
        <div className="about-info">
          <input
            type="text"
            placeholder="Enter About me"
            onChange={(e) =>
              setAboutInfoDumy({
                ...aboutInfoDumy,
                about: e.target.value,
              })
            }
            value={aboutInfoDumy.about}
          />
          Select Gender
          <div
            onChange={(e) =>
              setAboutInfoDumy({
                ...aboutInfoDumy,
                gender: e.target.value,
              })
            }
            value={aboutInfoDumy.gender}
            className="search-radio"
          >
            {aboutInfoDumy.gender === "male" ? (
              <input type="radio" value="male" name="gender" checked={true} />
            ) : (
              <input type="radio" value="male" name="gender" />
            )}
            Male
            <input type="radio" value="female" name="gender" />
            Female
            <input type="radio" value="other" name="gender" />
            Other
          </div>
          <input
            type="date"
            placeholder="Enter Date of Birth"
            onChange={(e) =>
              setAboutInfoDumy({
                ...aboutInfoDumy,
                dateOfBirth: e.target.value,
              })
            }
            value={aboutInfoDumy.dateOfBirth}
          />
          <input
            type="text"
            placeholder="Enter Current City"
            onChange={(e) =>
              setAboutInfoDumy({
                ...aboutInfoDumy,
                currentCity: e.target.value,
              })
            }
            value={aboutInfoDumy.currentCity}
          />
          <input
            type="text"
            placeholder="Enter Current Country"
            onChange={(e) =>
              setAboutInfoDumy({
                ...aboutInfoDumy,
                currentCountry: e.target.value,
              })
            }
            value={aboutInfoDumy.currentCountry}
          />
          <input
            type="text"
            placeholder="Enter Past Cities"
            onChange={(e) =>
              setAboutInfoDumy({
                ...aboutInfoDumy,
                pastCities: e.target.value,
              })
            }
            value={aboutInfoDumy.pastCities}
          />
          <input
            type="text"
            placeholder="Enter Past Countries"
            onChange={(e) =>
              setAboutInfoDumy({
                ...aboutInfoDumy,
                pastCountries: e.target.value,
              })
            }
            value={aboutInfoDumy.pastCountries}
          />
          <div>
            <button
              onClick={() => {
                let d1 = aboutInfoDumy.pastCities;
                // console.log(d1);
                d1 = d1.split(",").map((e) => {
                  return { city: e };
                });
                let d2 = aboutInfoDumy.pastCountries;
                d2 = d2.split(",").map((e) => {
                  return { country: e };
                });
                setAboutInfo({
                  ...aboutInfoDumy,
                  pastCities: d1,
                  pastCountries: d2,
                });
                console.log(aboutInfo);
                setAboutModel(false);
                updateProfile({
                  ...aboutInfoDumy,
                  pastCities: d1,
                  pastCountries: d2,
                });
              }}
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setAboutInfoDumy({
                  about: "",
                  gender: "male",
                  dateOfBirth: "",
                  currentCity: "",
                  currentCountry: "",
                  pastCities: "",
                  pastCountries: "",
                });
                setAboutInfo({
                  about: "",
                  gender: "male",
                  dateOfBirth: "",
                  currentCity: "",
                  currentCountry: "",
                  pastCities: [],
                  pastCountries: [],
                });
              }}
            >
              Clear Changes
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={educationModel}
        onClose={() => setEducationModel(false)}
        center
      >
        <div className="edu-info">
          <input
            type="text"
            placeholder="Enter College Name"
            onChange={(e) =>
              setEducationInfoObject({
                ...educationInfoObject,
                collegeName: e.target.value,
              })
            }
            value={educationInfoObject.collegeName}
          />
          <input
            type="text"
            placeholder="Enter Course"
            onChange={(e) =>
              setEducationInfoObject({
                ...educationInfoObject,
                course: e.target.value,
              })
            }
            value={educationInfoObject.course}
          />
          <input
            type="text"
            placeholder="Enter Field Of Study / Department"
            onChange={(e) =>
              setEducationInfoObject({
                ...educationInfoObject,
                fieldOfStudy: e.target.value,
              })
            }
            value={educationInfoObject.fieldOfStudy}
          />
          <input
            type="text"
            placeholder="Enter Year of Passing"
            onChange={(e) =>
              setEducationInfoObject({
                ...educationInfoObject,
                yearOfPassing: e.target.value,
              })
            }
            value={educationInfoObject.yearOfPassing}
          />
          <div>
            <button
              onClick={() => {
                setEducationModel(false);
                setEducationInfo([...educationInfo, educationInfoObject]);
                updateProfile({
                  education: [...educationInfo, educationInfoObject],
                });
                setEducationInfoObject({
                  collegeName: "",
                  course: "",
                  fieldOfStudy: "",
                  yearOfPassing: "",
                });
              }}
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setEducationInfoObject({
                  collegeName: "",
                  course: "",
                  fieldOfStudy: "",
                  yearOfPassing: "",
                });
              }}
            >
              Clear Changes
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={workModel} onClose={() => setWorkModel(false)} center>
        <div className="work-info">
          <input
            type="text"
            placeholder="Enter Organization"
            onChange={(e) =>
              setWorkInfoObject({
                ...workInfoObject,
                organization: e.target.value,
              })
            }
            value={workInfoObject.organization}
          />
          <input
            type="text"
            placeholder="Enter Position"
            onChange={(e) =>
              setWorkInfoObject({
                ...workInfoObject,
                position: e.target.value,
              })
            }
            value={workInfoObject.position}
          />
          <input
            type="text"
            placeholder="Enter years of Experience"
            onChange={(e) =>
              setWorkInfoObject({
                ...workInfoObject,
                yearOfExperience: e.target.value,
              })
            }
            value={workInfoObject.yearOfExperience}
          />
          <input
            type="text"
            placeholder="Enter Field"
            onChange={(e) =>
              setWorkInfoObject({
                ...workInfoObject,
                field: e.target.value,
              })
            }
            value={workInfoObject.field}
          />
          <input
            type="date"
            placeholder="Enter Start Date"
            onChange={(e) =>
              setWorkInfoObject({
                ...workInfoObject,
                startDate: e.target.value,
              })
            }
            value={workInfoObject.startDate}
          />
          <input
            type="date"
            placeholder="Enter End Date"
            onChange={(e) =>
              setWorkInfoObject({
                ...workInfoObject,
                endDate: e.target.value,
              })
            }
            value={workInfoObject.endDate}
          />
          <div>
            <button
              onClick={() => {
                setWorkModel(false);
                setWorkInfoObject([...workInfo, workInfoObject]);
                updateProfile({
                  workExperience: [...workInfo, workInfoObject],
                });
                setWorkInfoObject({
                  organization: "",
                  position: "",
                  yearOfExperience: "",
                  startDate: "",
                  endDate: "",
                  field: "",
                });
              }}
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setWorkInfoObject({
                  organization: "",
                  position: "",
                  yearOfExperience: "",
                  startDate: "",
                  endDate: "",
                  field: "",
                });
              }}
            >
              Clear Changes
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={photoModel} onClose={() => setPhotoModel(false)} center>
        <div className="upload-photo">
          <input
            type="file"
            onChange={(e) => {
              updateProfilePhoto(e.target.files);
            }}
          />

          <button
            onClick={() => {
              uploadPhoto();
            }}
          >
            Upload Photo <MdUploadFile size={20} />{" "}
          </button>
          {photo !== "" ? (
            <button
              onClick={() => {
                deletePhoto();
              }}
            >
              Delete Photo
            </button>
          ) : (
            true
          )}
        </div>
      </Modal>
      <div className="profile-section">
        <div className="profile-body">
          <div className="combine">
            <div className="img-section">
              <h1>
                Welcome, {profileData.firstName}&nbsp;
                {profileData.lastName}
              </h1>
            </div>
            <div className="img-basic-info">
              <div className="img-basic-info-img">
                {photo === "" ? (
                  <img src="Images/avatar.jpg" alt="Avatar" />
                ) : (
                  <img src={photo} alt="Avatar" />
                )}

                <div className="add-img">
                  <MdCameraEnhance
                    style={iconStyle}
                    size={20}
                    onClick={() => setPhotoModel(true)}
                  />
                </div>
              </div>

              <div className="img-basic-info-info">
                <div className="icon-and-heading">
                  <h2>
                    {profileData.firstName}&nbsp;
                    {profileData.lastName}
                  </h2>
                  <FaEdit
                    style={iconStyle}
                    onClick={() => setBasicModel(true)}
                  />
                </div>
                <h3>{profileData.profession}</h3>
                <div className="img-basic-info-info-contact">
                  <div>
                    <MdEmail style={iconStyle} /> &nbsp; {profileData.email}
                  </div>
                  <div>
                    <MdOutlinePhoneInTalk style={iconStyle} />
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
                      <FaLinkedin style={iconStyle} />
                      &nbsp; LinkedIn
                    </a>
                  </div>
                  <div>
                    <a
                      href={profileData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GoMarkGithub style={iconStyle} />
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
              <FaEdit style={iconStyle2} onClick={() => setAboutModel(true)} />
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
              <div>
                <MdAddBox
                  style={iconStyle2}
                  onClick={() => {
                    setEducationModel(true);
                  }}
                />
                &nbsp; &nbsp;
                <MdDelete
                  style={iconStyle2}
                  onClick={() => {
                    updateProfile({
                      education: [],
                    });
                  }}
                />
              </div>
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
              <div>
                <MdAddBox
                  style={iconStyle2}
                  onClick={() => {
                    setWorkModel(true);
                  }}
                />
                &nbsp; &nbsp;
                <MdDelete
                  style={iconStyle2}
                  onClick={() => {
                    updateProfile({
                      workExperience: [],
                    });
                  }}
                />
              </div>
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
          {postData.length > 0 ? (
            <>
              <div className="userPost">
                <div className="heading-post">
                  <h2>Your Post</h2>
                </div>
                <div className="user-post-container">
                  {postData.map((e) => {
                    return (
                      <>
                        <div className="post post-user">
                          <div className="who-posting">
                            {e.post.avatar ? (
                              <img
                                src={`data:image/jpeg;base64,${e.post.avatar}`}
                                alt=""
                              />
                            ) : (
                              <img src="Images/avatar.jpg" alt="" />
                            )}

                            <div className="who-posting-info">
                              <h6>{`${e.post.firstName} ${e.post.lastName}`}</h6>
                              <p>{e.post.profession}</p>
                            </div>
                            <div>
                              <MdDelete
                                style={iconStyle}
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "You want to delete this post"
                                    )
                                  ) {
                                    deletePost(e._id);
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <p>{e.post.description}</p>
                          <img
                            src={`data:image/jpeg;base64,${e.post.photo}`}
                            alt=""
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            true
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
