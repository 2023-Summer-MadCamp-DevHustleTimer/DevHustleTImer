import React from "react";
import LeftSection from "../LeftSection/LeftSection";
import RightSection from "../RightSection/RightSection";
import "./layout.css";

const Layout = () => {
  return (
    <div className="container">
      <div className="left">
        <LeftSection></LeftSection>
      </div>
      <div className="right">
        <RightSection></RightSection>
      </div>
    </div>
  );
}

export default Layout;
