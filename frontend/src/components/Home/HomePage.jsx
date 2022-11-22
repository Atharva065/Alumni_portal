import React, { useState, useEffect, useContext } from "react";
import CarouselComponent from "./Carousel/CarouselComponent";
import PlarformInfo from "./ExplorePlatform/PlarformInfo";

import Testinomial from "./Testinomial/Testinomial";
import YoutubeVideos from "./YouTubeVideos/YoutubeVideos";
import userContext from "../../context/userContext";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const APIkey = "AIzaSyBrWprelFdIodGD9EZu9dxsQpTjjLZC8Ik";
const channelId = "UC4Pc9V7-QjsJZKkUS8I0iqw";
const result = "100";

const HomePage = () => {
  const s = useContext(userContext);
  const [loader, setLoader] = useState(false);
  const loaderCSS = css`
    position: fixed;
    top: 50%;
    left: 50%;
  `;

  async function getYoutubeData() {
    setLoader(true);
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${result}&order=date&key=${APIkey}`,
        requestOptions
      );
      if (!response.ok) {
        const error = new Error(response.error);
        throw error;
      }
      const data = await response.json();
      console.log(data);
      s.changeYoutube(data);
      // console.log(data);
      // console.log("Hiiiiiii");
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
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
      setLoader(false);
    }
  }
  console.log(s.youtube);
  useEffect(() => {
    if (Object.keys(s.youtube).length === 0) {
      console.log("Heyyyy");
      getYoutubeData();
    }
    // getYoutubeData();
    if (s.login === false) {
      getUserProfile().then((data) => {
        if (!data) {
          return;
        }
        s.changeUser(data);
        // console.log(data);
        s.changeLogin(true);
        setLoader(false);
      });
    }
    // eslint-disable-next-line
  }, []);
  // console.log(s);
  return (
    <>
      <ClipLoader
        color="#02023d"
        // size={100}
        css={loaderCSS}
        loading={loader}
      />
      <CarouselComponent />
      <PlarformInfo />
      <YoutubeVideos />
      <Testinomial />
    </>
  );
};

export default HomePage;
