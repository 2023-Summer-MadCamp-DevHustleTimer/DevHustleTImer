import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import "./LeftSection.css";

const divmod = (x, y) => [Math.floor(x / y), x % y];

const LeftSection = () => {

  const [eventTime, setEventTime] = useState(moment("2023-07-19 21:00:00"));
  const currentTime = moment();
  const timeRemaining = moment.duration(eventTime.diff(currentTime)).asSeconds();
  const [tmp1, remainingSeconds] = divmod(timeRemaining, 60);
  const [tmp2, remainingMinutes] = divmod(tmp1, 60);
  const [remainingDays, remainingHours] = divmod(tmp2, 24);

  const [count, setCount] = useState(0);
  useEffect(() => {
    getTargetTime();
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  async function getTargetTime() {
    var response = await axios.get('http://localhost:3001/api/me');
    const utcTime = moment(response.data.event.endTime);
    const koreaTime = utcTime.clone().add(0, 'hours');
    setEventTime(koreaTime);
  }


  return (
    <div className="left_section">
      <div className="notice">
        <span>내일 스크럼은 14:00 입니다</span>
        <br />
        <span>지각하지 마세요!</span>
      </div>
      <div className="timer">
        <span className="goal">발표까지</span>
        <br />
        <span className="time-left">
          {remainingDays}일 {remainingHours}시간 {remainingMinutes}분 {parseInt(remainingSeconds)}초
        </span>
      </div>
      <span className="queto">
        It doesn’t work...... why?
        <br />
        It works..................... why?
      </span>
    </div>
  );
}

export default LeftSection;
