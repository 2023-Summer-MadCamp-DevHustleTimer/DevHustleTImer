import React from "react";
import "./RightSection.css";
import Music from "../Music/Music";

const RightSection = () => {
  console.log(process.env.REACT_APP_YOUTUBE_API_KEY);
  return (
    <div className="right_section">
      <div className="navigator">
        navigator
      </div>
      <div className="right_content">
        right_content
        <Music></Music>
      </div>
    </div>
  );
}

export default RightSection;
