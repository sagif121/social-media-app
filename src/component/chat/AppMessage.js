import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import http from "../../services/http";

import { Link } from "react-router-dom";
import "../chat/chat.css";

const socket = io("http://localhost:5000");

function AppMessage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  useEffect(() => {
    socket.on("message", (payload) => {
      setChat([...chat, payload]);
    });
  });

  const [firstName, setUser] = useState({});
  useEffect(() => {
    async function getUserName() {
      let userName = await http.get("http://localhost:5000/users");

      return setUser(userName.data.firstName);
    }

    getUserName();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("message", {
      firstName,
      message,
      id: userDetails._id,
    });
    setMessage("");
  };
  return (
    <div className="AppMessage">
      <Link to="/">
        <button className="exitechat">
          <i className="fa fa-close"></i>
        </button>
      </Link>
      <div>
        <h1> {"hello   " + firstName} </h1>
        {chat.map((payload, index) => {
          return (
            <div
              className={
                payload.id === userDetails._id
                  ? "bodymessageUser"
                  : "bodymessageOther"
              }
            >
              <div className={`message--me`} key={index}></div>

              <div className="message__user">{payload.firstName}:</div>
              <div className="message__content">{payload.message}</div>
            </div>
          );
        })}
        <form onSubmit={sendMessage}>
          <input
            className="message"
            type="text"
            name="message"
            placeholder="Type message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            required
          ></input>
          <button className="messagebutton" type="submit">
            <div className="slide"></div>
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppMessage;
