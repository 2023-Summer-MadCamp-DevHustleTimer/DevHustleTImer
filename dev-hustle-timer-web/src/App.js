import logo from './logo.svg';
import './App.css';
import { createStore } from "redux";
import { Provider, useSelector, useDispatch, connect } from "react-redux";
import Layout from "./components/Layout/Layout";

function reducer(currentState, action) {
  if (currentState === undefined) {
    return {
      index: 1,
    };
  }
  const newState = { ...currentState };
  return newState;
}
const store = createStore(reducer);

function App() {
  return (
    <div className="wrap">

      <video src="images/bg.mp4" loop={true} autoPlay={true} muted={true}></video>
      <div>
        공지사항 입니다. 속보입니다 속보
      </div>
      <section id="circle">
        tes
        
        <article className="face1">
          안녕1
        </article>


        <article className="face2">
          방가워2


        </article>
        <article className="face3">
          내이름은3


        </article>
        <article className="face4">
          현수야.4


        </article>
        
      </section>

    </div>
  );
}

export default App;
