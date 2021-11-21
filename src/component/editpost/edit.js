import React, { Component, useState, useEffect } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";

import "../../App.css";

import http from "../../services/http";

const Edit = () => {
  let history = useHistory();
  const [postDetails, setPostDetails] = useState("empty");
  let { createdBy, content, dateCreated, image, likes, _id, comments } =
    postDetails;
  let { postId } = useParams();

  const [deletePost, setdelPost] = useState(_id);

  const [user, setUser] = useState({});
  useEffect(() => {
    async function getOnlineUser() {
      let userOnline = await http.get("http://localhost:5000/users");
      return setUser(userOnline.data);
    }

    getOnlineUser();
  }, []);

  useEffect(() => {
    async function dataPosta() {
      let data = await http.get("http://localhost:5000/posts/" + postId);

      return setPostDetails(data.data[0]);
    }
    dataPosta();
  }, []);

  let handlEditComment = async (idd) => {
    const postEdit = await http
      .put(`http://localhost:5000/posts/${idd}`, postDetails)
      .then((response) => {
        if (response) {
          window.location = "/";
        }
      });

    return postEdit;
  };

  let handlDeelComment = async (testId) => {
    fetch("http://localhost:5000/posts/" + testId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    window.location = "/";
  };

  if (!user) {
    window.location = "/";
  }

  return (
    <div dir="rtl">
      {postDetails === "empty" ? (
        <h1 className="loader">Loading</h1>
      ) : (
        <div class="row row-cols-1 row-cols-md-3 g-2">
          <span></span>
          <div class="col">
            <div class="card  divclass">
              <div class="cardeditpos">
                <div className="cardbodyedit">
                  <h5 class="card-title">{createdBy}</h5>
                  <small class="text-muted">{dateCreated}</small>
                  <p></p>
                  <textarea
                    class="edit"
                    value={content}
                    onChange={(e) => {
                      setPostDetails({
                        ...postDetails,
                        content: e.target.value,
                      });
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="buttonedit">
                <button
                  onClick={() => handlEditComment(postId)}
                  type="button"
                  class="btn btn-outline-primary "
                >
                  פרסם
                </button>
                <button
                  onClick={() => handlDeelComment(postId)}
                  type="button"
                  class="btn btn-outline-primary "
                >
                  מחק
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
