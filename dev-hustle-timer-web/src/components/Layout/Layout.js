import React,{useRef,useEffect} from "react";
import LeftSection from "../LeftSection/LeftSection";
import RightSection from "../RightSection/RightSection";
import "./layout.css";
import backimg from "../../img/Neon1.mp4";
import LandingPage from "./LandingPage";

const Layout = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Change this to your desired speed
    }
  }, []);

  return (
    <div className="container">
      <div className="video-background">

        <video ref={videoRef} src ={backimg} loop autoPlay muted playB></video>
      </div>

      <LandingPage></LandingPage>
      {/* <div className="left">
        <LeftSection></LeftSection>
      </div>
      <div className="right">
        <RightSection></RightSection>
      </div> */}
    </div>
  );
}

export default Layout;
