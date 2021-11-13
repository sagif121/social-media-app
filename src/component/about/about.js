import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
import Newpost from "../newpost/newpost";
import Posts from "../../example/posts";
import CommentsArray from "../../example/commentsArray";
import News from "../news/news";

const About = () => {
  let [newArray, setnewArray] = useState(CommentsArray);
  let [mainArray, setMainArray] = useState("commentsArray");
  let [check, setCheck] = useState("");
  let log = (value) => {
    console.log("value", value);
    console.log("Logged by The children");
  };
  let objectToPost = {};

  return (
    <div>
      <Newpost></Newpost>
    </div>
  );
};
export default About;
