import React, { Component, useState, useEffect } from "react";
import "../../App.css";
import Post from "../post/post";
import Signup from "../login/signup";
import Login from "../login/login";
import Posts from "../../example/posts";
import http from "../../services/http";
import News from "../news/news";
import AppMessage from "../chat/AppMessage";
import { FcSearch } from "react-icons/fc";
import { BsFillAlarmFill } from "react-icons/bs";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [foundedPostsState, setFoundedPostsState] = useState([]);
  const [nothingFounded, setNothingFounded] = useState();
  let [searchValue, setSearchValue] = useState("");
  let [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    async function dataPosta() {
      let data = await http.get("http://localhost:5000/posts");

      setAllPosts(data.data.reverse());

      return;
    }
    dataPosta();
  }, []);

  let searchPosts = (textForSearch) => {
    setSearchMode(true);
    let foundedPosts = [];
    if (textForSearch === "") {
      setFoundedPostsState(allPosts);
    }
    allPosts.map((post) => {
      if (post.content.includes(textForSearch)) {
        foundedPosts.push(post);
      } else {
      }
    });
    setFoundedPostsState(foundedPosts);
    if (!foundedPostsState.length > 0) {
      setNothingFounded(true);
    }
  };
  let reloadAll = () => {
    setSearchMode(false);
    setNothingFounded(false);
  };

  return (
    <>
      <div class="input-group">
        <div class="form-outline">
          <input
            placeholder="search"
            type="search"
            id="form1"
            class="form-control"
            className="searchinput"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <label class="form-label" for="form1"></label>
        </div>
        <button
          type="button"
          class="btn searchbutton "
          onClick={() => {
            searchPosts(searchValue);
          }}
        >
          <FcSearch></FcSearch>
        </button>
      </div>

      <div className="homePage">
        <News></News>
        {nothingFounded && (
          <div>
            <div>OOps nothing was Founded</div>
            <button onClick={reloadAll}>Reload all posts</button>
          </div>
        )}
        {!searchMode &&
          allPosts.map((postDetails) => {
            return <Post postDetails={postDetails} />;
          })}
        {searchMode &&
          foundedPostsState.length > 0 &&
          foundedPostsState.map((postDetails) => {
            return <Post postDetails={postDetails} />;
          })}
      </div>
    </>
  );
};
export default Home;
