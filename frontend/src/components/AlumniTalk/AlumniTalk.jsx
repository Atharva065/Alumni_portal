import React, { useContext, useEffect, useState } from "react";
import { css } from "@emotion/react";
import userContext from "../../context/userContext";

import { ClipLoader } from "react-spinners";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import "./AlumniTalk.css";

const APIkey = "AIzaSyBwGzaoE-eBHuiy7b2KSLFDLs7E3ZKGzBQ";
const channelId = "UC4Pc9V7-QjsJZKkUS8I0iqw";
const result = "100";

const AlumniTalk = () => {
  const s = useContext(userContext);

  const [loader, setLoader] = useState(false);
  const loaderCSS = css`
    position: fixed;
    top: 50%;
    left: 50%;
  `;
  const [youtubeUrl, setyoutubeUrl] = useState({
    mainUrl: [],
    publishedAt: [],
    title: [],
    description: [],
  });

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

      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }
  function setData() {
    console.log(s.youtube);
    const data2 = s.youtube.items.map((e) => {
      return e.id.videoId;
    });
    console.log(data2);
    const data3 = s.youtube.items.map((e) => {
      return e.snippet.publishedAt;
    });

    const data4 = s.youtube.items.map((e) => {
      return e.snippet.title;
    });

    const data5 = s.youtube.items.map((e) => {
      return e.snippet.description;
    });

    setyoutubeUrl({
      mainUrl: [...data2],
      publishedAt: [...data3],
      title: [...data4],
      description: [...data5],
    });
  }

  useEffect(() => {
    if (Object.keys(s.youtube).length === 0) {
      getYoutubeData();
    }
    setData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="alumni-talk-main">
        <ClipLoader
          color="#02023d"
          // size={100}
          css={loaderCSS}
          loading={loader}
        />
        {youtubeUrl.mainUrl.map((e, i) => {
          return (
            <div className="talk-data">
              <div className="video-title">
                <div className="talk-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeUrl.mainUrl[i]}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="video-info">
                  <BsFillCalendarWeekFill />

                  <span>
                    {new Date(youtubeUrl.publishedAt[i]).toLocaleDateString()}
                  </span>

                  <h3>{youtubeUrl.title[i]}</h3>

                  <p>{youtubeUrl.description[i]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AlumniTalk;
