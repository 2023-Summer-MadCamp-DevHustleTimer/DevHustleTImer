import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import "./LeftSection.css";
import io from "socket.io-client";

const divmod = function(x, y){

  if(x<0){
    return [ -Math.floor(-x/y),x%y];
  }

  return([
  
  Math.floor(x / y), x % y]);
};

const LeftSection = () => {

  const [eventTime, setEventTime] = useState(moment("2023-07-19 21:00:00"));
  const currentTime = moment();
  const timeRemaining = moment.duration(eventTime.diff(currentTime)).asSeconds();
  const [tmp1, remainingSeconds] = divmod(timeRemaining, 60);
  const [tmp2, remainingMinutes] = divmod(tmp1, 60);
  const [remainingDays, remainingHours] = divmod(tmp2, 24);

 const [title, setTitle] = useState("");
 const [subtitle, setSubtitle] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    getTargetTime();
    const socket = io("http://localhost:8080");
    socket.on("event", (msg) => {
      console.log("new events");
      getTargetTime();
    });
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  async function getTargetTime() {
    var response = await axios.get('http://localhost:3001/api/me');
    setTitle(response.data.event.title);
    setSubtitle(response.data.event.subtitle);
    const utcTime = moment(response.data.event.endTime);
    const koreaTime = utcTime.clone().add(0, 'hours');
    setEventTime(koreaTime);
  }

  var str="";


  return (
    <div className="left_section">
      <div className="notice">
        <span>{title}</span>
      </div>
      <div className="timer">
        <span className="goal">{subtitle}</span>
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
