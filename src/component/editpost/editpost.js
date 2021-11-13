// import React, { Component, useState, useEffect } from "react";
// import "../../App.css";
// import logo from "../../logo1.svg";
// import http from "../../services/http";

// const Editpost = ({ postDetails }) => {
//   // const { userName, content, date } = postDetails;
//   const { createdBy, content, dateCreated, image, likes, _id, comments } =
//     postDetails;
//   const [deletePost, setdelPost] = useState(_id);

//   let handlDelComment = async () => {
//     fetch("http://localhost:3000/posts/" + _id, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(deletePost),
//     })
//       .then((res) => res.json())
//       .then((data) => console.log(data));
//   };
//   console.log(handlDelComment);

//   // useEffect(() => {
//   //   async function del(idPost) {
//   //     let dalit = await http.delete("http://localhost:3000/posts/" + _id);
//   //     return;
//   //   }
//   //   del();
//   // }, []);

//   // useEffect(() => {
//   //   // DELETE request using fetch with async/await
//   //   async function deletePost() {
//   //     await fetch("http://localhost:3000/posts/", { method: "DELETE" });
//   //     setdelPost("Delete successful");
//   //   }

//   //   deletePost();
//   // }, []);

//   return (
//     <div dir="rtl">
//       <div class="row row-cols-1 row-cols-md-3 g-2">
//         <span></span>
//         <div class="col">
//           <div class="card h-100">
//             <div class="card-body">
//               <div className="cardbodyedit">
//                 <h5 class="card-title">{createdBy}</h5>
//                 <small class="text-muted">{dateCreated}</small>
//                 <p></p>
//                 <p class="card-text">{content}</p>
//               </div>
//               <img src={""} class="card-img-top" alt="..."></img>
//             </div>
//             <div>
//               <button type="button" class="btn btn-outline-primary ">
//                 edit
//               </button>
//               <button type="button" class="btn btn-outline-primary ">
//                 delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Editpost;
