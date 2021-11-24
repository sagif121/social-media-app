import React, { useState, useEffect } from "react";
import "../../App.css";
import Post from "../post/post";
import http from "../../services/http";
import News from "../news/news";
import { FcSearch } from "react-icons/fc";

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
      <div className="input-group">
        <div className="form-outline">
          <input
            placeholder="search"
            type="search"
            id="form1"
            className="form-control"
            className="searchinput"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>

        <button
          type="button"
          className="btn searchbutton "
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
            return <Post key={postDetails.content} postDetails={postDetails} />;
          })}
        {searchMode &&
          foundedPostsState.length > 0 &&
          foundedPostsState.map((postDetails) => {
            <li key={postDetails.content}></li>;
            return <Post key={postDetails.content} postDetails={postDetails} />;
          })}
      </div>
    </>
  );
};
export default Home;
