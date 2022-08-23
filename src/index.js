import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // ReactDOM.render is no longer supported in React 18
// function render() {
//   ReactDOM.render(<App />, document.getElementById("root"))
// }

function render() {
  const root = ReactDOM.createRoot(document.getElementById("root"))
  root.render(<App />)
}

render()

if(module.hot) {
  module.hot.accept('./App.js', () => {
    render()
  })
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
