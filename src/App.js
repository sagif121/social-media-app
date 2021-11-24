import React, { useState, useEffect } from "react";
import "./App.css";

import Header from "./component/header/header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./component/about/about";
import Home from "./component/home/home";
import Login from "../src/component/login/login";
import Signup from "../src/component/login/signup";

import Edit from "./component/editpost/edit";

import AppMessage from "./component/chat/AppMessage";
import CreatMassage from "./component/chat/CreateMessage";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    let userDetails = localStorage.getItem("userDetails");
    setUser(userDetails);
  }, []);

  return (
    <div className="App">
      <Header user={user}></Header>

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/newPost" component={About}></Route>

        {user ? null : (
          <>
            <ToastContainer autoClose={false} />
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
