import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../../App.css";

import http from "../../services/http";

const Edit = () => {
  const [postDetails, setPostDetails] = useState("empty");
  let { createdBy, content, dateCreated } = postDetails;
  let { postId } = useParams();

  const [user, setUser] = useState({});
  useEffect(() => {
    try {
      async function getOnlineUser() {
        let userOnline = await http.get("http://localhost:5000/users");
        return setUser(userOnline.data);
      }

      getOnlineUser();
    } catch (err) {
      console.log(err);
    }
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
        <div className="row row-cols-1 row-cols-md-3 g-2">
          <span></span>
          <div className="col">
            <div className="card  divclass">
              <div className="cardeditpos">
                <div className="cardbodyedit">
                  <h5 className="card-title">{createdBy}</h5>
                  <small className="text-muted">{dateCreated}</small>
                  <p></p>
                  <textarea
                    className="edit"
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
                  className="btn btn-outline-primary "
                >
                  פרסם
                </button>
                <button
                  onClick={() => handlDeelComment(postId)}
                  type="button"
                  className="btn btn-outline-primary "
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
