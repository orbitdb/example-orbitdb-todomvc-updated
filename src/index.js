import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Model from "./utils/todoModel";
import store from "./utils/store";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";

import "todomvc-app-css/index.css";

const namespace = "react-todos";
let model = null;

function render() {
  ReactDOM.render(
    <Router>
      <App model={model} />
    </Router>,
    document.getElementById("root")
  );
}

store(namespace).then(db => {
  model = new Model(db, namespace);
  db.load().then(result => {
    model.subscribe(render);
    render();
    registerServiceWorker();
  });
});
