import React, { Component, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { render } from "react-dom";
import Header from "./component/header/header";
import Fotter from "./component/about/about";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./component/about/about";
import Home from "./component/home/home";
import Login from "../src/component/login/login";
import Signup from "../src/component/login/signup";
import Newpost from "./component/newpost/newpost";
import newComments from "./component/newcomment/newcomment";
import Edit from "./component/editpost/edit";
import News from "./component/news/news";
import Messages from "./component/chat/Messages";
import socketIOClient from "socket.io-client";
import AppMessage from "./component/chat/AppMessage";
import CreatMassage from "./component/chat/CreateMessage";
import http from "./services/http";
import AppCamera from "./component/camera/Appcamera";
const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getOnlineUser() {
      let userOnline = await http.get("http://localhost:5000/users");
      console.log("userDetails", userOnline.data);
      localStorage.setItem("userDetails", JSON.stringify(userOnline.data));
      return setUser(userOnline.data);
    }

    getOnlineUser();
  }, []);

  return (
    <div className="App">
      <Header user={user}></Header>

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/newPost" component={About}></Route>

        {user ? null : (
          <>
            <Route path="/login/login" component={Login}></Route>
            <Route path="/login/signup" component={Signup}></Route>
          </>
        )}

        <Route path="/edit/:postId" component={Edit}></Route>
        <Route path="/AppMessage" component={AppMessage}></Route>
        <Route path="/CreateMessage" component={CreatMassage}></Route>
      </Switch>
    </div>
  );
};
export default App;
