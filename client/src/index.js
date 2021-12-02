import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { io } from "socket.io-client";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

const socket = io("http://localhost:9999");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Container>
        <App socket={socket} />
      </Container>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
