import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Board />, document.getElementById("root"));
serviceWorker.unregister();
