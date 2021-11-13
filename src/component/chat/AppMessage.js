import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import http from "../../services/http";
import AppCamera from "../camera/Appcamera";
import { Link } from "react-router-dom";
import "../chat/chat.css";

const socket = io("http://localhost:5000");
// const usersName = "user " + parseInt(Math.random() * 10);

// const usersName = { firstName };
function AppMessage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  useEffect(() => {
    socket.on("message", (payload) => {
      setChat([...chat, payload]);
      console.log("payload", payload);
    });
  });

  const [firstName, setUser] = useState({});
  useEffect(() => {
    async function getUserName() {
      let userName = await http.get("http://localhost:5000/users");
      console.log(userName);
      return setUser(userName.data.firstName);
    }

    getUserName();
  }, []);

  console.log(firstName);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
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
          <i class="fa fa-close"></i>
        </button>
      </Link>
      <div>
        <h1> {"hello   " + firstName} </h1>
        {chat.map((payload, index) => {
          console.log("payload in map", payload);
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

        {/* <AppCamera></AppCamera> */}
      </div>
    </div>
  );
}

export default AppMessage;
