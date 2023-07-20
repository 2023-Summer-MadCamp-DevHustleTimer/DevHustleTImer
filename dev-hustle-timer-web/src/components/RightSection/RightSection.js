import React, { useState } from "react";
import "./RightSection.css";
import Chat from "../Chat/Chat";
import Music from "../Music/Music";
import WhenToMeet from "../WhenToMeet/WhenToMeet";
import Setting from "../Setting/Setting";
import { useSelector,useDispatch } from "react-redux";
import { HiArrowUpLeft, HiArrowUpRight } from "react-icons/hi2";

const RightSection = () => {
  console.log(process.env.REACT_APP_YOUTUBE_API_KEY);
  const index = useSelector((state)=>state.index);
  const dispatch = useDispatch();
  const handleBackClick = () => {
    dispatch({type:"CHANGE_INDEX",index:(index+3)%4});
  };
  const handleClick = () => {
    dispatch({type:"CHANGE_INDEX",index:(index+1)%4});
  };
  return (
    <div className="right_section">
      <div className="navigator-wrapper">
        <div className="navigator-button onclick_magnify" onClick={handleBackClick}>
          <HiArrowUpLeft />
          이전
        </div>
        <div className="navigator-button onclick_magnify" onClick={handleClick}>
          다음
          <HiArrowUpRight />
        </div>
      </div>
      <div className ="right_content">
      <div className={`rotate-button ${index!=0 ? 'rotated180' : ''}`}>
          <Chat></Chat>
        </div>
        <div className={`rotate-button ${index!=1 ? 'rotated180' : ''}`}>
          <Music></Music>
        </div>
        <div className={`rotate-button ${index!=2 ? 'rotated180' : ''}`}>
          <WhenToMeet></WhenToMeet>
        </div>
        <div className={`rotate-button ${index!=3 ? 'rotated180' : ''}`}>
          <Setting></Setting>
        </div>
      </div>
    </div >
  );
}

export default RightSection;
