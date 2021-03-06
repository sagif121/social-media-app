import React, { Component, useState } from "react";

import "../../App.css";

const NewComments = ({ idPost, pushNewComment }) => {
  const [newCommentValue, setNewCommentValue] = useState("");
  let userDetail = JSON.parse(localStorage.getItem("userDetails"));
  const getInputValue = (event) => {
    const userValue = event.target.value;
  };

  let handlePostComment = async () => {
    let data = false;
    try {
      let commentForPost = { comments: [{ commentContent: newCommentValue }] };
      let req = await fetch(
        "http://localhost:5000/posts/newComment/" + idPost,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentForPost),
        }
      );

      if (req.status === 200) {
        data = await req.json();
      }
      if (data) {
        pushNewComment({ commentContent: newCommentValue });
        setNewCommentValue("");
      }
    } catch (err) {
      console.log("ddddddd", err);
    }
  };
  return (
    <span>
      {userDetail ? (
        <div>
          <input
            className="inputcomment"
            placeholder="כתוב תגובה"
            onChange={(e) => {
              setNewCommentValue(e.target.value);
            }}
            value={newCommentValue}
          ></input>
        </div>
      ) : null}
      {newCommentValue.length > 0 && (
        <span>
          <button
            type="button"
            className="commentbutton"
            className="btn btn-outline-primary commentbutton "
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
