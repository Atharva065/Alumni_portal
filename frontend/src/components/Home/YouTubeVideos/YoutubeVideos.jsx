import React, { useEffect, useState } from "react";
import Api from "../../../API/youTube";
import "./YoutubeVideos.css";

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC4Pc9V7-QjsJZKkUS8I0iqw&maxResults=5&order=date&key=AIzaSyDUTZTpKo5O6fCFIwDeNOmm5QCZpKRVZWM

// const API = "AIzaSyCW62Nn00V6RCkSvLJ0_i0zSg097Xj30hQ";
// const API = "AIzaSyCW62Nn00V6RCkSvLJ0_i0zSg097Xj30hQ";
// const channelId = "UC4Pc9V7-QjsJZKkUS8I0iqw";

// const result = "4";

// const finalUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${result}&order=date&key=${API}`;

const YoutubeVideos = () => {
  const [youtubeUrl, setyoutubeUrl] = useState([]);

  async function getVideos() {
    console.log();
    try {
      // const response = await fetch(finalUrl);

      // const data = await response.json();
      const data = Api;
      // console.log(data);

      const data2 = data.items.map((e) => {
        return e.id.videoId;
      });

      setyoutubeUrl([...data2]);

      // console.log(videoUrl);
      // console.log(response);
      // console.log(youtubeUrl);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <div className="main-talk-div">
        <h1>Alumni Talk Series</h1>
        <div className="alumni-talk-video">
          {youtubeUrl.map((ele) => {
            return (
              <div className="alumni-talk">
                <iframe
                  src={`https://www.youtube.com/embed/${ele}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default YoutubeVideos;
