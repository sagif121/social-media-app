import React, { Component, useState } from "react";
import "../../App.css";
import Newpost from "../newpost/newpost";
import CommentsArray from "../../example/commentsArray";

const About = () => {
  let [newArray, setnewArray] = useState(CommentsArray);
  let [mainArray, setMainArray] = useState("commentsArray");
  let [check, setCheck] = useState("");

  return (
    <div>
      <Newpost></Newpost>
    </div>
  );
};
export default About;
