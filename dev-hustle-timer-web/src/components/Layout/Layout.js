import React, { useRef, useEffect, useState } from "react";
import LeftSection from "../LeftSection/LeftSection";
import RightSection from "../RightSection/RightSection";
import "./layout.css";
import backimg from "../../img/Neon1.mp4";
import LandingPage from "./LandingPage";
import axios from 'axios';


const Layout = () => {
  const videoRef = useRef(null);
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    console.log("처음 실행됐어유");
    apiInit();

    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Change this to your desired speed
    }
  }, []);
  async function apiInit() {
    try {

      let response = await axios.get('http://localhost:3001/api/me', {
      });
      console.log(response.data);
      setIsSigned(true);

    } catch (error) {
      console.log("error")
      console.log(error.response.data);
    }
  }

  return (
    <div className="container">
      <div className="video-background">

        <video ref={videoRef} src={backimg} loop autoPlay muted playB></video>
      </div>
      {isSigned ? (<div className ="page-container"><div className="left">
        <LeftSection></LeftSection>
      </div>
        <div className="right">
          <RightSection></RightSection>
        </div></div>) : <LandingPage></LandingPage>}

    </div>
  );
}

export default Layout;
