import React, { Component, useState, useEffect } from "react";
import "../../App.css";
import logo from "../../logo1.svg";
import Comments from "../comments/comments";
import CommentsArray from "../../example/commentsArray";
import { Link } from "react-router-dom";
import NewComments from "../newcomment/newcomment";
import http from "../../services/http";
import News from "../news/news";
// import { AiFillLike } from "@react-icons/all-files/fa/AiFillLike";
import { AiFillLike } from "react-icons/ai";

const Post = ({ postDetails }) => {
  const {
    createdBy,
    content,
    dateCreated,
    image,
    likes,
    _id,
    comments,
    userId,
  } = postDetails;
  let [newCommentsArray, setNewCommentsArray] = useState([]);
  let commentLoaded = false;
  let x = ["s", "s", "s", "s", "s", "s", "s", "s"];
  let handleLike = async () => {
    let userIdForLike = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log("userIdForLike", userIdForLike);
    fetch("http://localhost:5000/posts/newLike/" + _id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likedBy: userIdForLike }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data message", data.message);
        if (data.message === "Already liked") {
          console.log("already liked from server");
        } else if (data.message === "like saved") {
          setLocalLikes([...localLikes, { likesBy: userIdForLike }]);
        }
      });
  };
  useState(() => {
    setNewCommentsArray(comments);
  }, []);
  console.log("xxxx", comments);
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getOnlineUser() {
      let userOnline = await http.get("http://localhost:5000/users");
      // console.log(userOnline);
      return setUser(userOnline.data);
    }

    getOnlineUser();
  }, []);
  // console.log(user);
  let [localLikes, setLocalLikes] = useState(likes);

  // const [firstName, setUser1] = useState({});
  // useEffect(() => {
  //   async function getUserName() {
  //     let userName = await http.get("http://localhost:5000/users");
  //     console.log(userName);

  //     console.log(setUser1);
  //     return setUser1(userName.data.firstName);
  //   }

  //   getUserName();
  // }, []);

  return (
    <div dir="rtl">
      <div>
        {user?._id === userId ? (
          <Link to={"/edit/" + _id}>
            <button className="btnedit" type="button">
              edit
            </button>
          </Link>
        ) : null}
      </div>

      <div class="row row-cols-1 row-cols-md-3 g-4">
        <span></span>

        <div class="col">
          <div className="card h-80">
            <br />

            <div class="card-body">
              <div className="cardbody">
                <h5 class="card-title"> {createdBy} </h5>
                <small class="text-muted">{dateCreated}</small>
                <p></p>
                <p className="postcontent" class="card-text">
                  {content}
                </p>
              </div>
              <hr className="h1card" />
              <div className="comments">
                {comments.length > 0 &&
                  comments.map((comment) => {
                    return (
                      <Comments
                        commentsDetails={comment}
                        // firstNames={firstName}
                      />
                    );
                  })}
              </div>
            </div>

            <div>
              {localLikes.length > 0 && (
                <div className="numoflike">
                  {localLikes.length} <AiFillLike />
                </div>
              )}
              <button
                type="button"
                class="btn btn-outline-primary "
                onClick={handleLike}
              >
                like
              </button>
              <NewComments idPost={_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
