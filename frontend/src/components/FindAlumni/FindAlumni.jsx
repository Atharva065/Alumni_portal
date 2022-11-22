import React, { useState, useEffect, useContext } from "react";
import { FcFilledFilter, FcSearch } from "react-icons/fc";
import { AiOutlineClear } from "react-icons/ai";
import "./FindAlumni.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
import { Modal } from "react-responsive-modal";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "react-responsive-modal/styles.css";
import userContext from "../../context/userContext";
import { MdOutlineOpenInNew } from "react-icons/md";
const FindAlumni = () => {
  const [open, setOpen] = useState(false);
  const [alumniData, setAlumniData] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [length, setLength] = useState(5);
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    city: "",
    country: "",
    yearOfPassing: "",
    organization: "",
    fildOfStudy: "",
  });
  const [loader, setLoader] = useState(false);
  const [searchURL, setSearchURL] = useState("");
  const [page, setPage] = useState(1);
  const history = useHistory();
  const s = useContext(userContext);
  const loaderCSS = css`
    position: fixed;
    top: 50%;
    left: 50%;
    ${"" /* margin: auto; */}
  `;

  const makeURL = () => {
    const data = { ...credentials };
    data.cities = data.city;
    data.countries = data.country;
    delete data.country;
    delete data.city;
    for (let [key, value] of Object.entries(data)) {
      if (value === "" || value === undefined) {
        delete data[key];
      }
    }
    let url = "";
    for (let [key, value] of Object.entries(data)) {
      if (url !== "") {
        url = url + "&";
      }
      url = url + `${key}=${value}`;
    }
    url = url.replace("cities", "cities.city");
    url = url.replace("countries", "countries.country");
    url = url.replace("yearOfPassing", "education.yearOfPassing");
    url = url.replace("fildOfStudy", "education.fildOfStudy");
    url = url.replace("organization", "workExperience.organization");
    return url;
  };

  const searchByNameFunc = () => {
    let array = searchByName.split(" ");
    array = array.filter((e) => {
      return e !== "";
    });
    let url = "";
    for (let iterator of array) {
      if (url !== "") {
        url = url + "&";
      }
      url = url + `words=${iterator}`;
    }
    return url;
  };

  async function findAlumniByButton() {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        return;
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({
        // 	// email: credentials.email,
        // 	// password: credentials.password,
        // }),
      };
      const url = makeURL() || searchByNameFunc();
      setSearchURL(url);
      if (url === "") {
        toast.warning("Please type valid input...", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        setLoader(false);
        return;
      }
      const response = await fetch(
        // `http://localhost:4000/users/me/findAlumni?${url}&page=${1}`,
        `/users/me/findAlumni?${url}&page=${1}`,
        requestOptions
      );
      if (!response.ok) {
        const error = new Error(response.error);
        throw error;
      }
      const data = await response.json();
      if (data.length === 0) {
        toast.warning("Sorry, We don't have reasults for this search", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
      setAlumniData([...data]);
      setPage(2);
      setLoader(false);
      setCredentials({
        firstName: "",
        lastName: "",
        gender: "",
        city: "",
        country: "",
        yearOfPassing: "",
        organization: "",
        fildOfStudy: "",
      });
      setSearchByName("");
    } catch (error) {
      toast.warning("Error...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      console.log(error);
      setLoader(false);
      setCredentials({
        firstName: "",
        lastName: "",
        gender: "",
        city: "",
        country: "",
        yearOfPassing: "",
        organization: "",
        fildOfStudy: "",
      });
      setSearchByName("");
    }
  }
  async function findAlumniFunc() {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        // push user to login page
        // history.push("/signin");
        return;
        // throw new Error();
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({
        // 	// email: credentials.email,
        // 	// password: credentials.password,
        // }),
      };

      const response = await fetch(
        // `http://localhost:4000/users/me/findAlumni?${searchURL}&page=${page}`,
        `/users/me/findAlumni?${searchURL}&page=${page}`,
        requestOptions
      );
      if (!response.ok) {
        const error = new Error(response.error);
        throw error;
      }
      console.log(response);
      const data = await response.json();
      // console.log(data.length);
      setLength(data.length);
      setLoader(false);
      setAlumniData([...alumniData, ...data]);
      setCredentials({
        firstName: "",
        lastName: "",
        gender: "",
        city: "",
        country: "",
        yearOfPassing: "",
        organization: "",
        fildOfStudy: "",
      });
      setSearchByName("");
    } catch (error) {
      toast.warning("Error...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      console.log(error);
      setLoader(false);
      setCredentials({
        firstName: "",
        lastName: "",
        gender: "",
        city: "",
        country: "",
        yearOfPassing: "",
        organization: "",
        fildOfStudy: "",
      });
      setSearchByName("");
    }
  }
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
      setLoader(false);
      return data;
    } catch (error) {
      history.push("/signin");
      console.log("error");
      setLoader(false);
    }
  }

  useEffect(() => {
    setLoader(true);
    findAlumniFunc();
    setLoader(false);
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    setLoader(true);
    if (s.login === false) {
      getUserProfile().then((data) => {
        if (!data) {
          console.log("datataaa");
          history.push("/signin");
          return;
        }
        s.changeUser(data);
        console.log(data);
        s.changeLogin(true);
        setLoader(false);
      });
    }
    setLoader(false);
    // eslint-disable-next-line
  }, []);
  //   console.log(alumniData);
  // console.log(alumniData.length);
  return (
    <>
      <ToastContainer />

      <ClipLoader
        color="#02023d"
        // size={100}
        css={loaderCSS}
        loading={loader}
      />
      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="search-container">
          <h2 className="search-container-h2">
            <FcFilledFilter />
            Advance Filter
            <FcFilledFilter />
          </h2>
          <div className="search-container-inputs">
            <div className="search-input">
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    firstName: e.target.value,
                  })
                }
                value={credentials.firstName}
              />
              <button
                onClick={() => {
                  setCredentials({
                    ...credentials,
                    firstName: "",
                  });
                }}
              >
                Clear
              </button>
            </div>
            <div className="search-input">
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    lastName: e.target.value,
                  })
                }
                value={credentials.lastName}
              />
              <button
                onClick={() => {
                  setCredentials({
                    ...credentials,
                    lastName: "",
                  });
                }}
              >
                Clear
              </button>
            </div>
            <div className="search-input">
              <input
                type="text"
                placeholder="Country"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    country: e.target.value,
                  })
                }
                value={credentials.country}
              />
              <button
                onClick={() => {
                  setCredentials({
                    ...credentials,
                    country: "",
                  });
                }}
              >
                Clear
              </button>
            </div>
            <div className="search-input">
              <input
                type="text"
                placeholder="City"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    city: e.target.value,
                  })
                }
                value={credentials.city}
              />
              <button
                onClick={() => {
                  setCredentials({
                    ...credentials,
                    city: "",
                  });
                }}
              >
                Clear
              </button>
            </div>
            <div className="search-input">
              <input
                type="number"
                placeholder="Year of Passing "
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    yearOfPassing: e.target.value,
                  })
                }
                value={credentials.yearOfPassing}
              />
              <button
                onClick={() => {
                  setCredentials({
                    ...credentials,
                    yearOfPassing: "",
                  });
                }}
              >
                Clear
              </button>
            </div>
            <div className="search-input">
              <input
                type="text"
                placeholder="Department - Ex. IT, Mech"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    fildOfStudy: e.target.value,
                  })
                }
                value={credentials.fildOfStudy}
              />
              <button
                onClick={() => {
                  setCredentials({
                    ...credentials,
                    fildOfStudy: "",
                  });
                }}
              >
                Clear
              </button>
            </div>
            <div className="search-input">
              <input
                type="text"
                placeholder="Organization - Ex.TCS"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    organization: e.target.value,
                  })
                }
                value={credentials.organization}
              />
              <button
                onClick={() => {
                  setCredentials({
                    ...credentials,
                    organization: "",
                  });
                }}
              >
                Clear
              </button>
            </div>
            <div className="search-input">
              <div
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    gender: e.target.value,
                  })
                }
                value={credentials.gender}
                className="search-radio"
              >
                <input type="radio" value="male" name="gender" />
                Male
                <input type="radio" value="female" name="gender" />
                Female
                <input type="radio" value="other" name="gender" />
                Other
              </div>
              {/* <button
								onClick={() => {
									setCredentials({
										...credentials,
										gender: "",
									});
								}}
							>
								Clear
							</button> */}
            </div>
          </div>
          <div className="search-container-buttons">
            <div className="search-button">
              <button
                onClick={() => {
                  setOpen(false);
                  findAlumniByButton();
                }}
              >
                Search
                <FcSearch />
              </button>
            </div>
            <div className="clear-button">
              <button
                onClick={() => {
                  setCredentials({
                    firstName: "",
                    lastName: "",
                    gender: "",
                    city: "",
                    country: "",
                    yearOfPassing: "",
                    organization: "",
                    fildOfStudy: "",
                  });
                }}
              >
                Clear All
                <AiOutlineClear />
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <button className="filter-button" onClick={() => setOpen(true)}>
        Advance Filter
        <FcFilledFilter size={40} />
      </button>
      <div
        className="search-by-name"
        style={alumniData.length === 0 ? { marginBottom: "30rem" } : {}}
      >
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearchByName(e.target.value)}
          value={searchByName}
        />
        <button
          onClick={() => {
            findAlumniByButton();
          }}
        >
          Search
          <FcSearch />
        </button>
      </div>
      <div className="result-section">
        <div className="result-section-parent">
          {/* -------------------------------------- */}

          {/* -------------------------------------- */}
          {alumniData.length > 0 &&
            alumniData.map((alumni) => {
              return (
                <div className="result-section-chiid" key={alumni._id}>
                  <div className="img-and-heading">
                    <div className="img-div">
                      <img
                        src={
                          alumni.avatar
                            ? `data:image/jpeg;base64,${alumni.avatar}`
                            : `Images/avatar.jpg`
                        }
                        alt="avatar"
                      />
                    </div>
                    <div className="cart-heading">
                      <h2>
                        {alumni.firstName} &nbsp;
                        {alumni.lastName}
                      </h2>
                      <h4>{alumni.profession}</h4>
                    </div>
                  </div>
                  <div className="info-section">
                    <p>
                      <strong>Email: </strong>
                      {alumni.email}
                    </p>
                    <p>
                      <strong>Contact: </strong>
                      {alumni.contactNo}
                    </p>
                    <p>
                      <strong>City: </strong>
                      {alumni.currentCity}
                    </p>
                    <p>
                      <strong>Country: </strong>
                      {alumni.currentCountry}
                    </p>
                    <p>
                      <strong>Gender: </strong>
                      {alumni.gender}
                    </p>
                  </div>
                  <div className="button-open-profile">
                    <button
                      onClick={() => {
                        console.log(alumni, "😅😅😅");
                        history.push({
                          pathname: "/OnClickProfile",

                          state: alumni,
                        });
                      }}
                    >
                      Open Profile
                      <MdOutlineOpenInNew />
                    </button>
                  </div>
                </div>
              );
            })}
          <button
            class="cta"
            onClick={() => {
              setPage(page + 1);
            }}
            style={length === 5 ? { display: "block" } : { display: "none" }}
          >
            <span>Load more</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default FindAlumni;
