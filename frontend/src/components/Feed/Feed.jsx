import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import { Buffer } from "buffer";
import userContext from "../../context/userContext";
import "./Feed.css";

const Feed = () => {
  const loaderCSS = css`
    position: fixed;
    top: 50%;
    left: 50%;
  `;
  const history = useHistory();
  const s = useContext(userContext);
  const [description, setdescription] = useState("");
  const [loader, setLoader] = useState(false);
  const [openPostMOdel, setOpenPostMOdel] = useState(false);
  const [page, setPage] = useState(1);
  const [alumniData, setAlumniData] = useState([]);
  const [photo, setPhoto] = useState("");
  const [displayButton, setDisplayButton] = useState(true);
  const updatePost = (e) => {
    setPhoto(e);
  };

  const uploadPhoto = async () => {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        throw new Error();
      }

      const formData = new FormData();
      formData.append("post", photo[0]);
      if (photo[0] === undefined && description === "") {
        toast.error("Atleast one field is required", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        setLoader(false);
        return;
      }
      if (photo[0] === undefined && description !== "") {
        tweet().then(() => {
          setLoader(false);
        });
        return;
      }
      formData.append("description", description);
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };
      const response = await fetch(
        // "http://localhost:4000/users/me/post",
        "/users/me/post",
        requestOptions
      );
      if (!response.ok) {
        const error = new Error(response.error);
        throw error;
      }

      toast.success("Profile Photo Updated", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      setAlumniData([]);
      setPage(1);
      setDisplayButton(true);
      setLoader(false);
      setPhoto("");
      setdescription("");
      getPost(1);
    } catch (error) {
      console.log(error);
      setdescription("");
      setLoader(false);
    }
  };

  const tweet = async () => {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        throw new Error();
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
        }),
      };
      const response = await fetch(
        // `http://localhost:4000/users/me/tweet`,
        `/users/me/tweet`,
        requestOptions
      );
      if (!response.ok) {
        const error = new Error(response.error);
        throw error;
      }

      toast.success("Successful", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      setAlumniData([]);
      setPage(1);
      setDisplayButton(true);
      setLoader(false);
      setdescription("");
      getPost(1);
    } catch (error) {
      console.log(error);
      setdescription("");
      setLoader(false);
    }
  };
  console.log(description);
  const getPost = async (p) => {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        throw new Error();
      }
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/josn",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        // `http://localhost:4000/users/me/post?&page=${p}`,
        `/users/me/post?&page=${p}`,
        requestOptions
      );
      console.log(response);

      if (!response.ok) {
        const error = new Error(response.error);
        throw error;
      }
      const data = await response.json();

      const data2 = data.feed.map((e) => {
        if (e.post.photo) {
          e.post.photo = new Buffer.from(e.post.photo).toString("base64");
        }
        if (e.post.avatar) {
          e.post.avatar = new Buffer.from(e.post.avatar).toString("base64");
        }
        return e;
      });
      if (data2.length === 0) {
        toast.success("Thats what we have for now", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        setDisplayButton(false);
      }
      if (p === 1) {
        setAlumniData([...data2]);
      } else {
        setAlumniData([...alumniData, ...data2]);
      }
      // setAlumniData([...alumniData, ...data2]);

      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

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
      // console.log(data);
      // setWhoLogged(data);
      setLoader(false);
      return data;
    } catch (error) {
      history.push("/signin");
      console.log("error");
      setLoader(false);
    }
  }

  async function getUser(_id) {
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
        // `http://localhost:4000/users/getUser?id=${_id}`,
        `/users/getUser?id=${_id}`,
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
    if (s.login === false) {
      getUserProfile().then((data) => {
        if (!data) {
          history.push("/signin");
          return;
        }
        s.changeUser(data);
        s.changeLogin(true);
        setLoader(false);
        getPost(1);
      });
    } else if (s.login === true) {
      getPost(1);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ClipLoader
        color="#02023d"
        // size={100}
        css={loaderCSS}
        loading={loader}
      />
      <div className="feed-main">
        <div className="all-posts">
          <div
            className="new-post"
            style={alumniData.length === 0 ? { marginBottom: "30rem" } : {}}
          >
            <p>New Post</p>
            <hr />

            <button onClick={() => setOpenPostMOdel(true)}>
              What's on your mind?
            </button>
            {/* <img
							src={`data:image/jpeg;base64,${renderPhoto}`}
							alt=""
						/> */}
            <Modal
              open={openPostMOdel}
              onClose={() => setOpenPostMOdel(false)}
              center
            >
              <textarea
                id="message"
                placeholder="Put Your Thought Here !..."
                style={{
                  width: "100%",
                  height: "50vh",
                  background: "none",
                  outline: "none",
                  resize: "none",
                  overflow: "auto",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "none",
                }}
                onChange={(e) => setdescription(e.target.value)}
                value={description.message}
              ></textarea>
              <div></div>
              <div className="post-file">
                <div className="upload-img">
                  <input
                    type="file"
                    onChange={(e) => {
                      updatePost(e.target.files);
                    }}
                  />
                </div>

                <button
                  onClick={() => {
                    setOpenPostMOdel(false);
                    uploadPhoto();
                  }}
                >
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          fill="currentColor"
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>Send</span>
                </button>
              </div>
            </Modal>
            {/* <MdOutlineAddPhotoAlternate />
            <FiSend style={iconStyle} /> */}
          </div>
          <hr />
          {alumniData.map((e) => {
            return (
              <>
                <div className="post">
                  <div
                    className="who-posting"
                    onClick={() => {
                      console.log(e.post.owner);
                      getUser(e.post.owner)
                        .then((data) => {
                          history.push({
                            pathname: "/OnClickProfile",

                            state: data,
                          });
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    {e.post.avatar ? (
                      <img
                        src={`data:image/jpeg;base64,${e.post.avatar}`}
                        alt=""
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <img src="Images/avatar.jpg" alt="" />
                    )}

                    <div className="who-posting-info">
                      <h6>{`${e.post.firstName} ${e.post.lastName}`}</h6>
                      <p>{e.post.profession}</p>
                    </div>
                  </div>
                  <p>{e.post.description}</p>
                  {e.post.photo && (
                    <img
                      src={`data:image/jpeg;base64,${e.post.photo}`}
                      alt=""
                    />
                  )}
                </div>
              </>
            );
          })}
          <div className="pagination-button">
            <button
              class="cta"
              onClick={() => {
                getPost(page + 1);
                setPage(page + 1);
              }}
              style={
                displayButton === true
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <span>Load more</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
        <div className="user-profile">
          {/* <img src="images/event1.jpg" alt="" />
          <div className="profile-info">
            <img src="images/avatar.jpg" alt="" />
          </div> */}
          <div class="feed-container">
            <img
              class="ProfBackImg"
              src="https://www.transparenttextures.com/patterns/crissxcross.png"
              alt=""
            />
            <img
              class="ProfileImg"
              src={`data:image/jpeg;base64,${s.user.avatar}`}
              alt=""
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/profilePage");
              }}
            />

            <div>{`${s.user.firstName} ${s.user.lastName}`}</div>
            <p>{s.user.about}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
