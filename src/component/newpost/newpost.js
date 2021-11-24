import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import http from "../../services/http";
const Newpost = ({ postDetails, log, commentsArray, setMainArray }) => {
  let [userDetails, setUserDetails] = useState("");
  let [newPostObject, setNewPostObject] = useState({
    content: "",
    dateCreated: "",
    dateUpdated: "",
    image: "",
    createdBy: userDetails ? userDetails._id : "",
  });
  let saveNewPost = async () => {
    setNewPostObject({
      ...newPostObject,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      createdBy: userDetails._id,
    });
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
            <i className="fa fa-close"></i>
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
            setNewPostObject({ ...newPostObject, content: e.target.value });
          }}
          value={newPostObject.content}
        />
      </form>
      <div className="addtopost"></div>
      <div>
        {newPostObject.content.length > 1 && (
          <button
            className="btn btn-outline-primary buttonnewpost "
            type="button"
            onClick={saveNewPost}
          >
            פרסם
          </button>
        )}
      </div>
    </div>
  );
};

export default Newpost;
