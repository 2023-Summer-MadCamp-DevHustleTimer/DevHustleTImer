import React, { useState } from "react";
import "./RightSection.css";
import Chat from "../Chat/Chat";
import Music from "../Music/Music";
import WhenToMeet from "../WhenToMeet/WhenToMeet";
import Setting from "../Setting/Setting"

const RightSection = () => {
  console.log(process.env.REACT_APP_YOUTUBE_API_KEY);
  const [whatRotated,setWhatRotated] =useState(0);

  const handleClick = () => {
    console.log(whatRotated);
    setWhatRotated(
      (whatRotated+1)%4
    );

  };

  return (
    <div className="right_section">
      <div className="navigator">
        <button onClick={handleClick}>
          버튼
        </button>
      </div>
      <div className ="right_content">
      <div className={`rotate-button ${whatRotated!=0 ? 'rotated180' : ''}`}>
          <Chat></Chat>
        </div>
        <div className={`rotate-button ${whatRotated!=1 ? 'rotated180' : ''}`}>
          <Music></Music>
        </div>
        <div className={`rotate-button ${whatRotated!=2 ? 'rotated180' : ''}`}>
          <WhenToMeet></WhenToMeet>
        </div>
        <div className={`rotate-button ${whatRotated!=3 ? 'rotated180' : ''}`}>
          <Setting></Setting>
        </div>
      </div>
    </div >
  );
}

export default RightSection;
