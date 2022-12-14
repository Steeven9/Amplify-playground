import { Amplify } from "aws-amplify";
import React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
