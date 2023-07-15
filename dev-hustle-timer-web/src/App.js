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
    <div className="App">
      <Provider store={store}>
        <Layout></Layout>
      </Provider>
    </div>
  );
}

export default App;
