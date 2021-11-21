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
  var currentDate = new Date(dateCreated);
  let y = new Date(parseInt(dateCreated)).toString();
  let dateFinal = y.slice(4, 21);

  let handleLike = async () => {
    let userIdForLike = JSON.parse(localStorage.getItem("userDetails"))._id;

    fetch("http://localhost:5000/posts/newLike/" + _id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likedBy: userIdForLike }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Already liked") {
        } else if (data.message === "like saved") {
          setLocalLikes([...localLikes, { likesBy: userIdForLike }]);
        }
      });
  };
  useState(() => {
    setNewCommentsArray(comments);
  }, []);

  const [user, setUser] = useState({});
  useEffect(() => {
    async function getOnlineUser() {
      let userOnline = await http.get("http://localhost:5000/users");

      return setUser(userOnline.data);
    }

    getOnlineUser();
  }, []);

  let [localLikes, setLocalLikes] = useState(likes);

  return (
    <div dir="rtl">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <span></span>

        <div class="col">
          <div className="card h-80">
            <div>
              {user?._id === userId ? (
                <Link to={"/edit/" + _id}>
                  <button
                    className="btn btn-outline-primary btnedit"
                    type="button"
                  >
                    edit
                  </button>
                </Link>
              ) : null}
            </div>
            <br />

            <div class="card-body">
              <div className="cardbody">
                <h5 class="card-title"> {createdBy} </h5>
                <small class="text-muted">{dateFinal}</small>
                <p></p>
                <p className="postcontent" class="card-text">
                  {content}
                </p>
              </div>
              <hr className="h1card" />
              <div className="comments">
                {comments.length > 0 &&
                  comments.map((comment) => {
                    return <Comments commentsDetails={comment} />;
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
                disabled={likes.some((like) => postDetails.likedBy === userId)}
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
