import React, { useEffect, useState} from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { List, arrayMove } from 'react-movable';
import YouTube from "react-youtube";
import "./Music.css";

const Music = () => {
  const noEmbed = 'https://noembed.com/embed?url=';
  const urlForm = "https://www.youtube.com/watch?v=";
  const youtube_id = "LqME1y6Mlyg";

  const [title, setTitle] = useState("");
  const [items, setItems] = useState([["a","uMjfPsdNko8"], ["b", "TWJ32Qda7nM"], ["c", "1Qq23yRs1CA"],["d","huTj4J0VELY"]]);

  const updateTitle = async () => {
    const { title } = await _getPlayList(youtube_id);
    console.log(title);
    setTitle(title);
  }

  const updatePlayList = async () => {
    const newItems = await Promise.all( 
      items.map(async (e) => {
        const { title } = await _getPlayList(e[1]);
        return [title, e[1]];
      })
    )
    setItems(newItems);
  }

  useEffect(() => {
   updateTitle();
   updatePlayList();
  }, []);

  return (
    <div className="music_container">
      <YouTube
        videoId={youtube_id}
        id="player"
        opts={{
          width: "100%",
          height: "225",
        }}
      ></YouTube>
      <div className="title">
        {title}
      </div>
      <List
        values={items.map((t) => playlistCell(t))}
        onChange={({ oldIndex, newIndex }) => setItems(arrayMove(items, oldIndex, newIndex))}
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props }) => <li {...props}>{value}</li>}
      />
    </div>
  );
}

export default Music;

async function _getPlayList(videoId) {
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  let res = await fetch(url, options);

  let resOk = res && res.ok;
  if (resOk) {
    const resData = await res.json();

    const {title, channelId, channelTitle} = resData.items[0].snippet;
    const {duration} = resData.items[0].contentDetails;
    return {title, duration, channelTitle, channelId};
  }
}

const playlistCell = ([title, id]) => {
  return (
    <div className="playlist-cell">
      <div className="cell-icon-wrapper"><HiOutlineMenu></HiOutlineMenu></div>
      <div className="cell-title-wrapper">{title}</div>
    </div>
  );
}
