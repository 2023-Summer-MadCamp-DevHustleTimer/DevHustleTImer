import React, { useState } from "react";
import { useSwipeable } from 'react-swipeable';
import "./LeftSection.css";

const LeftSection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = [
    <div>
      <div className="notice">
        <span>내일 스크럼은 14:00 입니다</span>
        <br />
        <span>지각하지 마세요!</span>
      </div>
      <div className="timer">
        <span className="goal">발표까지</span>
        <br />
        <span className="time-left">6일 15시간 23초</span>   
      </div>
      <span  className="quote">
        It doesn’t work...... why?
        <br />
        It works..................... why?
      </span>
    </div>,
    <div>
      <div className="notice">
        <span>내일 스크럼은 14:01 입니다</span>
        <br />
        <span>지각하지 마세요!</span>
      </div>
      <div className="timer">
        <span className="goal">발표까지</span>
        <br />
        <span className="time-left">6일 15시간 23초</span>   
      </div>
      <span  className="quote">
        It doesn’t work...... why?
        <br />
        It works..................... why?
      </span>
    </div>
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentSection(currentSection === sections.length - 1 ? 0 : currentSection + 1),
    onSwipedRight: () => setCurrentSection(currentSection === 0 ? sections.length - 1 : currentSection - 1),
  });

  return (
    <div className="left_section" {...handlers} style={{transition: 'all 0.5s ease-out'}}>
      {sections[currentSection]}
    </div>
  );
}

export default LeftSection;
