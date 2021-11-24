import React from "react";
import "../../App.css";

const Comments = ({ commentsDetails }) => {
  let { commentContent } = commentsDetails;

  return (
    <div className="commentsbody" dir="rtl">
      {commentContent}
    </div>
  );
};
export default Comments;
