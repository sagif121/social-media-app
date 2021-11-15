import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
import CommentsArray from "../../example/commentsArray";
import Comments from "../comments/comments";
import http from "../../services/http";
const NewComments = ({ idPost }) => {
  // let [newCommentValue, setNewCommentValue] = useState("");
  const [newCommentValue, setNewCommentValue] = useState({
    comments: [{ commentContent: "" }],
  });

  const getInputValue = (event) => {
    // show the user input value to console
    const userValue = event.target.value;

    console.log(userValue);
  };

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
      {/* {newCommentValue.comments[0].commentContent.length > 0 && (
        <span className="commentbutton">
          <button
            type="button"
            class="btn btn-outline-primary "
            onClick={handlePostComment}
          >
            תגובה
          </button>
        </span>
      )} */}
      <div>
        <input
          className="inputcomment"
          placeholder="כתוב תגובה"
          // onKeyPress={(e) => {
          //   if (e.target.key === 13) {
          //     setNewCommentValue({
          //       comments: [{ commentContent: e.target.value }],
          //     });
          //   }
          // }}
          onChange={(e) => {
            setNewCommentValue({
              comments: [{ commentContent: e.target.value }],
            });
          }}
          value={newCommentValue.commentContent}
        ></input>
      </div>

      {newCommentValue.comments[0].commentContent.length > 0 && (
        <span>
          <button
            type="button"
            className="commentbutton"
            class="btn btn-outline-primary commentbutton "
            onClick={handlePostComment}
          >
            פרסם
          </button>
        </span>
      )}
    </span>
  );
};

export default NewComments;
