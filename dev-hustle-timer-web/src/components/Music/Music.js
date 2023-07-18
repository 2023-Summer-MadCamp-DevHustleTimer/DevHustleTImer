import React, { useEffect, useState} from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { List, arrayMove } from 'react-movable';
import YouTube from "react-youtube";
import "./Music.css";

const Music = () => {
  const noEmbed = 'https://noembed.com/embed?url=';
  const urlForm = "https://www.youtube.com/watch?v=";
  // 유튜브 URL 찾는 패턴
  const youtubeUrl = /(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/g;
  const youtube_id = "LqME1y6Mlyg";

  const [title, setTitle] = useState("");
  const [items, setItems] = useState([["a","uMjfPsdNko8"], ["b", "TWJ32Qda7nM"], ["c", "1Qq23yRs1CA"],["d","huTj4J0VELY"]]);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 새 줄을 만드는 동작을 막습니다.
      handleLinkSubmission();       // 메시지를 전송합니다.
    }
  }
  const handleLinkSubmission = () => {
    // 메시지를 전송하는 로직이 이곳에 들어갑니다.
    const playId = youtubeUrl.exec(message)[7];
    console.log(playId);
    setMessage("");
    setItems([...items, ["searching...", playId]]);
    console.log(items);
  }


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

  useEffect(() => {
    console.log("updating...")
    updatePlayList();
    // api 호출하여 playlist 저장하기
  },[items.length]);

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
        values={items.map((t, i) => playlistCell(t))}
        onChange={({ oldIndex, newIndex }) => {
          setItems(arrayMove(items, oldIndex, newIndex));
          // api 호출하여 playlist 저장하기
        }}
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props }) => <li {...props}>{value}</li>}
      />
      <div className="music-input-text">
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
