import React, { Component, useState } from "react";

import "../../App.css";

const NewComments = ({ idPost }) => {
  const [newCommentValue, setNewCommentValue] = useState({
    comments: [{ commentContent: "" }],
  });

  const getInputValue = (event) => {
    const userValue = event.target.value;
  };

  let handlePostComment = async () => {
    fetch("http://localhost:5000/posts/newComment/" + idPost, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCommentValue),
    })
      .then((res) => res.json())
      .then((data) => window.location.reload());
  };
  return (
    <span>
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
