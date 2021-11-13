import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
import CommentsArray from "../../example/commentsArray";
import Comments from "../comments/comments";
import http from "../../services/http";
const NewComments = ({ idPost }) => {
  // let [newCommentValue, setNewCommentValue] = useState("");
  const [newCommentValue, setNewCommentValue] = useState({
    comments: { commentContent: "" },
  });

  let handlePostComment = async () => {
    console.log("id", idPost);
    fetch("http://localhost:5000/posts/newComment/" + idPost, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCommentValue),
    })
      .then((res) => res.json())
      .then((data) => window.location.reload());
  };
  return (
    // <div>
    //   {CommentsArray.map((commentsDetails) => {
    //     return <Comments commentsDetails={commentsDetails} />;
    //   })}
    // </div>

    <span>
      <span className="commentbutton">
        <button
          type="button"
          class="btn btn-outline-primary "
          onClick={handlePostComment}
        >
          תגובה
        </button>
      </span>
      <div>
        <input
          className="inputcomment"
          placeholder="כתוב תגובה"
          onChange={(e) => {
            setNewCommentValue({
              comments: [{ commentContent: e.target.value }],
            });
          }}
          value={newCommentValue.commentContent}
        ></input>
      </div>
    </span>
  );
};

export default NewComments;
