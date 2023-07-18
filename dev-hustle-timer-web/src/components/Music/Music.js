import axios from "axios";
import React, { useEffect, useState, useRef} from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { List, arrayMove } from 'react-movable';
import YouTube from "react-youtube";
import "./Music.css";

const Music = () => {
  const noEmbed = 'https://noembed.com/embed?url=';
  const urlForm = "https://www.youtube.com/watch?v=";
  // 유튜브 URL 찾는 패턴
  const youtubeUrl = /(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/g;
  const loadingVideo = ["새 음악을 플레이리스트에 추가해 보세요!", "EMhKeVHboiA"];

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  // 입력값 관리 시작
  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 새 줄을 만드는 동작을 막습니다.
      handleLinkSubmission();       // 메시지를 전송합니다.
    }
  }
  const handleLinkSubmission = async () => {
    // 메시지를 전송하는 로직이 이곳에 들어갑니다.
    const playId = youtubeUrl.exec(message)[7];
    console.log(playId);
    setMessage("");
    const { title } = await _getPlayList(playId);
    const newItems = [...items, [title, playId]]
    setItems(newItems);
    postPlayList(newItems);
  }
  // 입력값 관리 끝

  // items 초기화 함수
  const getPlayList = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/music`);
    const newItems = await Promise.all(
      response.data.data.map(async (value) => {
        const { title } = await _getPlayList(value.videoId);
        return [title, value.videoId];
      })
    );
    setItems(newItems);
  }

  // newItems 게시 함수
  const postPlayList = async (newItems) => {
    const reqForm = newItems.map((value, index) => {
      return {index: index, videoId: value[1], videoTitle: value[0]};
    });
    await axios.post(`${process.env.REACT_APP_API_URL}/api/music`, {
      data: reqForm
    });
    return;
  }

  useEffect(() => {
    getPlayList();
  }, []);

  return (
    <div className="music_container">
      <YouTube
        videoId={(items.length === 0)?loadingVideo[1]:items[0][1]}
        id="player"
        opts={{
          width: "100%",
          height: "225",
        }}
        onEnd={(event) => {
          const newItems = [...items]; // 새로운 배열 생성
          newItems.shift(); // 
          if(newItems.length !== 0){
            event.target.loadVideoById(newItems[0][1]);
          }
          setItems(newItems);
          postPlayList(newItems);
        }}
      ></YouTube>
      <div className="title">
        {(items.length === 0)?loadingVideo[0]:items[0][0]}
      </div>
      <List
        values={items.slice(1).map((t, i) => playlistCell(t))}
        onChange={({ oldIndex, newIndex }) => {
          const newItems = arrayMove(items, oldIndex+1, newIndex+1);
          setItems(newItems);
          postPlayList(newItems);
        }}
        onReady={(event) => {
          console.log("ready!!");
          event.target.playVideo();
        }}
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props }) => <li {...props}>{value}</li>}
      />
      <div className="music-input-text onclick_magnify">
        <textarea
          type="text"
          placeholder="유튜브 링크를 통해 음악을 추가해보세요!"
          rows={1}
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        // onChange={(e) => setMessage(e.target.value)}
        // onKeyPress={(e) => e.key === 'Enter' ? handleSend() : null}
        />
        <input type="submit" style={{ display: "none" }} />
      </div>
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
