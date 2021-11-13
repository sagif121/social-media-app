import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import CommentsArray from "../../example/commentsArray";
import About from "../about/about";
import http from "../../services/http";
const Newpost = ({ postDetails, log, commentsArray, setMainArray }) => {
  // const { userName, comment } = postDetails;
  // let userName, comment;
  // let [localArray, setLocalArray] = useState(commentsArray);
  // const [newComments, setnewComments] = useState("");
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
    // setUserDetails("ssdass");
    console.log("userdetails in useEffect", userDetails);
    console.log("userdetails in storage", localStorage.getItem("userDetails"));
    async function getOnlineUser() {
      userOnline = await http.get("http://localhost:5000/users");
      console.log(userOnline);
      return setUser(userOnline.data);
    }
    console.log(setUser);
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
        <h5 className="userdetails">
          {userDetails.firstName + " " + userDetails.lastName}
        </h5>
      </div>
      <hr className="hr" />
      <div>{/* <h6 className="username">{userName} </h6> */}</div>
      {/* <div> {newComments} </div> */}
      <form>
        <textarea
          className="thepostinput"
          placeholder={"מה אתה חושב , " + userDetails.firstName + " ?"}
          onChange={(e) => {
            newPostObject.content = e.target.value;
          }}
          // value={newComments}
        />
        {/* {newArray.length < 0 &&
          newArray.map((commentsDetails) => {
            return <About commentsDetails={commentsDetails} />;
          })} */}
      </form>
      <div className="addtopost">
        {/* <button className="bi bi-image-fill buttonnaddtopost "></button> */}
      </div>
      <div>
        <button
          className="btn btn-outline-primary buttonnewpost "
          type="button"
          onClick={saveNewPost}
          // className="buttonnewpost"
        >
          פרסם
        </button>
      </div>
    </div>
  );
};

export default Newpost;
