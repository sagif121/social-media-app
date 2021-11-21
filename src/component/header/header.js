import React, { Component, useState, useEffect } from "react";
import http from "../../services/http";
import "../../App.css";
import logo from "../../logo1.svg";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdPostAdd } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { BiLogInCircle } from "react-icons/bi";
import { BiLogOutCircle } from "react-icons/bi";
import { GiArchiveRegister } from "react-icons/gi";
const Header = ({ user }) => {
  let [founded, setFounded] = useState(false);
  let [posts, setPosts] = useState([]);

  let search = (searchValue) => {};
  async function logout() {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
  }

  let [userDetails, setUserDetails] = useState(false);

  const [user1, setUser] = useState({});
  let userOnline;
  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));

    async function getOnlineUser() {
      userOnline = await http.get("http://localhost:5000/users");
      setUser(userOnline.data);
      return;
    }

    getOnlineUser();
    let allPosts = JSON.parse(localStorage.getItem("allPosts"));
    setPosts(allPosts);
  }, []);

  return (
    <div className="head">
      <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container-fluid">
          <NavLink className="nav-link" to="/" activeClassName="active">
            <a class="navbar-brand" href="/">
              <span className="homeicon">
                <AiOutlineHome></AiOutlineHome>
              </span>
            </a>
          </NavLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {user ? (
                <li class="nav-item">
                  <NavLink className="nav-link active" to="/newPost">
                    <MdPostAdd> </MdPostAdd>יצירת פוסט
                  </NavLink>
                </li>
              ) : null}
              {user ? (
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="/AppMessage"
                  >
                    <BsChatDots></BsChatDots>
                  </a>
                </li>
              ) : null}
            </ul>

            {user ? (
              <a
                onClick={() => logout()}
                class="navbar-brand"
                aria-current="page"
                href="/login/login"
              >
                <BiLogOutCircle></BiLogOutCircle>
                {userDetails && "Logout" + " " + " " + userDetails.firstName}
              </a>
            ) : (
              <a class="navbar-brand" aria-current="page" href="/login/login">
                <BiLogInCircle />
              </a>
            )}

            {user ? null : (
              <a class="navbar-brand" aria-current="page" href="/login/signup">
                <GiArchiveRegister></GiArchiveRegister>
              </a>
            )}

            <a class="navbar-brand" href="/">
              <img className="logo" src={logo} alt="logo" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
