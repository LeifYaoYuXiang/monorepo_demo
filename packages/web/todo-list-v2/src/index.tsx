import React from 'react';
import  ReactDOM from 'react-dom';
import './styles/base.css'
import './styles/index.css'

import App from './App';
import reportWebVitals from './reportWebVitals';
import { TodoModel } from "./models/todoModel";

const model = new TodoModel("todos-react");

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App model={model} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

model.subscribe(render);

render()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
