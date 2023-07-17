import logo from './logo.svg';
import './App.css';
import { createStore } from "redux";
import { Provider, useSelector, useDispatch, connect } from "react-redux";
import Layout from "./components/Layout/Layout";
import React,{useEffect} from "react";

function reducer(currentState, action) {
  if (currentState === undefined) {
    return {
      index: 0,//main 인덱스
    };
  }
  const newState = { ...currentState };
  if (action.type === "CHANGE_INDEX") {
    newState.index = action.index;
  }
  return newState;
}
const store = createStore(reducer);

function App() {
  useEffect(() => {
    console.log("처음 실행됐어유1");
  }, []);
  return (
    <div className="App">
      <Provider store={store}>
        <Layout></Layout>
      </Provider>
    </div>
  );
}

export default App;
