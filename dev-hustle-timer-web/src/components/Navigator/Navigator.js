import React from "react";
import "./Navigator.css";
import { useSelector } from "react-redux";

const Navigator = () => {
  const index = useSelector((state) => state.index);
  return (
    <div className="right_section">
      <div className="Navigator">
        Navigator seems ${index}
      </div>
    </div>
  );
}

export default Navigator;
