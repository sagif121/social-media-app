import React, { Component, useState, useEffect } from "react";
import "../../App.css";
import Post from "../post/post";
import Signup from "../login/signup";
import Login from "../login/login";
import Posts from "../../example/posts";
import http from "../../services/http";
import News from "../news/news";
import AppMessage from "../chat/AppMessage";
const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  // useEffect(() => {
  //   console.log("hello");
  // }, []);

  // let http = "http://localhost:5000/posts";

  useEffect(() => {
    async function dataPosta() {
      let data = await http.get("http://localhost:5000/posts");
      console.log(data);
      return setAllPosts(data.data.reverse());
    }
    dataPosta();
  }, []);

  console.log("all", allPosts);

  // console.log("data", JSON.parse(localStorage.getItem("userDetails")));
  return (
    <div className="homePage">
      <News></News>

      {allPosts.map((postDetails) => {
        return <Post postDetails={postDetails} />;
      })}
      {/* <div className="calndertop">
        <iframe
          className="calender"
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23A79B8E&ctz=Asia%2FJerusalem&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&showTz=1&showDate=1&src=bjRsZmczcGF2YTk2N2UyYXZqMXI2ZTk1dWdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=aXcuamV3aXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23F4511E&color=%230B8043"
        ></iframe>
      </div> */}
    </div>
  );
};
export default Home;
