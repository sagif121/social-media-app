import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import CommentsArray from "../../example/commentsArray";
import About from "../about/about";
import http from "../../services/http";
const Newpost = ({ postDetails, log, commentsArray, setMainArray }) => {
  let [userDetails, setUserDetails] = useState("");

  let newPostObject = {
    content: "",
    dateCreated: "",
    dateUpdated: "",
    image: "",
    createdBy: "",
    comments: [],
    likes: [],
  };

  let saveNewPost = async () => {
    const newPost = await http
      .post("http://localhost:5000/posts/newPost", newPostObject)
      .then((response) => {
        if (response) {
          window.location = "/";
        }
      });

    return newPost;
  };

  const [user, setUser] = useState({});
  let userOnline;
  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));

    async function getOnlineUser() {
      userOnline = await http.get("http://localhost:5000/users");
      return setUser(userOnline.data);
    }

    getOnlineUser();
  }, []);

  if (!user) {
    window.location = "/login/signup";
  }

  return (
    <div className="newpost">
      <div className="headerpost">
        <Link to="/">
          <button className="exiteditpost">
            <i class="fa fa-close"></i>
          </button>
        </Link>
        <h1>יצירת פוסט</h1>
        <div className="userdetails">
          {userDetails.firstName + " " + userDetails.lastName}
        </div>
      </div>
      <hr className="hr" />

      <form>
        <textarea
          className="thepostinput"
          placeholder={"מה אתה חושב , " + userDetails.firstName + " ?"}
          onChange={(e) => {
            newPostObject.content = e.target.value;
          }}
          value={newPostObject.content}
        />
      </form>
      <div className="addtopost"></div>
      <div>
        <button
          className="btn btn-outline-primary buttonnewpost "
          type="button"
          onClick={saveNewPost}
        >
          פרסם
        </button>
      </div>
    </div>
  );
};

export default Newpost;
