import React from "react";
import "./LeftSection.css";

const LeftSection = () => {
  return (
    <div className="left_section">
      <div class="notice">
        <span>내일 스크럼은 14:00 입니다</span>
        <br />
        <span>지각하지 마세요!</span>
      </div>
      <div class="timer">
        <span class="goal">발표까지</span>
        <br />
        <span class="time-left">6일 15시간 23초</span>   
      </div>
      <span  class="queto">
        It doesn’t work...... why?
        <br />
        It works..................... why?
      </span>
    </div>
  );
}

export default LeftSection;
