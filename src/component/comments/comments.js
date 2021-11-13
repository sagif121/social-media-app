import React, { Component, useEffect, useState } from "react";
import "../../App.css";

const Comments = ({ commentsDetails, firstNames }) => {
  let { commentContent } = commentsDetails;
  // let { firstName } = firstNames;
  return (
    <div className="commentsbody" dir="rtl">
      {commentContent} {}
    </div>
  );
};
export default Comments;

// const Comments = ({ commentsDetails }) => {
//   console.log("asasdadasd");
//   const [Comment, setComment] = useState([]);
//   let { commentContent } = commentsDetails;
//   console.log("comments in comment", commentContent);

//   return (
//     <div className="commentsbody" dir="rtl">
//       <h1>dddd</h1>
//       {commentContent}
//     </div>
//   );
// };
// export default Comments;
