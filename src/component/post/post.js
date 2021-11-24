import React, { useState, useEffect } from "react";
import "../../App.css";

import Comments from "../comments/comments";

import { Link } from "react-router-dom";
import NewComments from "../newcomment/newcomment";
import http from "../../services/http";

import { AiFillLike } from "react-icons/ai";

const Post = ({ postDetails }) => {
  const { createdBy, content, dateCreated, likes, _id, comments, userId } =
    postDetails;
  let [newCommentsArray, setNewCommentsArray] = useState([]);
  const [allComments, setAllComments] = useState([]);
  let pushNewComment = (newComment) => {
    console.log("push", newComment);
    setAllComments([...allComments, newComment]);
  };

  let y = new Date(parseInt(dateCreated)).toString();
  let dateFinal = y.slice(4, 21);

  let handleLike = async () => {
    let userIdForLike = JSON.parse(localStorage.getItem("userDetails"))._id;
    try {
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
    } catch (err) {
      console.log(err);
    }
  };
  useState(() => {
    setNewCommentsArray(comments);
  }, []);

  const [user, setUser] = useState({});
  useEffect(() => {
    if (comments) {
      setAllComments(comments);
    }
    async function getOnlineUser() {
      let userOnline = await http.get("http://localhost:5000/users");

      return setUser(userOnline.data);
    }

    getOnlineUser();
  }, []);

  let [localLikes, setLocalLikes] = useState(likes);
  console.log("user._id", user._id);
  return (
    <div dir="rtl">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <span></span>

        <div className="col">
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

            <div className="card-body">
              <div className="cardbody">
                <h5 className="card-title"> {createdBy} </h5>
                <small className="text-muted">{dateFinal}</small>
                <p></p>
                <p className="postcontent" className="card-text">
                  {content}
                </p>
              </div>
              <hr className="h1card" />
              <div className="comments">
                {allComments.length > 0 &&
                  allComments.map((comment, index) => {
                    return <Comments key={index} commentsDetails={comment} />;
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
                className="btn btn-outline-primary "
                onClick={handleLike}
              >
                like
              </button>
              <NewComments
                idPost={_id}
                pushNewComment={(newComment) => {
                  pushNewComment(newComment);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
