import React, { useState, useEffect } from "react";
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
  let [posts, setPosts] = useState([]);
  let userDetail = JSON.parse(localStorage.getItem("userDetails"));

  async function logout() {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
  }

  let [userDetails, setUserDetails] = useState(false);

  const [user1, setUser] = useState({});
  let userOnline;
  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
    try {
      async function getOnlineUser() {
        userOnline = await http.get("http://localhost:5000/users");
        setUser(userOnline.data);
        return;
      }

      getOnlineUser(posts);
      let allPosts = JSON.parse(localStorage.getItem("allPosts"));
      setPosts(allPosts);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="head">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <NavLink className="nav-link" to="/" activeClassName="active">
            <AiOutlineHome></AiOutlineHome>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user ? (
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/newPost">
                    <MdPostAdd> </MdPostAdd>יצירת פוסט
                  </NavLink>
                </li>
              ) : null}

              {!userDetail ? (
                <div>
                  <div className="messagenotconnect">
                    You are not registered or logged in
                  </div>
                  <div className="tosignup">
                    <a
                      className="navbar-brand "
                      aria-current="page"
                      href="/login/signup"
                    >
                      to signup
                      <GiArchiveRegister></GiArchiveRegister>
                    </a>
                  </div>
                  <div className="tologin">
                    <a
                      onClick={() => logout()}
                      className="navbar-brand "
                      aria-current="page"
                      href="/login/login"
                    >
                      to login
                      <BiLogOutCircle></BiLogOutCircle>
                    </a>
                  </div>
                </div>
              ) : null}
              {user ? (
                <li className="nav-item">
                  <a
                    className="nav-link active"
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
                className="navbar-brand"
                aria-current="page"
                href="/login/login"
              >
                <BiLogOutCircle></BiLogOutCircle>
                {userDetails && "Logout" + " " + " " + userDetails.firstName}
              </a>
            ) : (
              <a
                className="navbar-brand"
                aria-current="page"
                href="/login/login"
              >
                <BiLogInCircle />
              </a>
            )}

            {user ? null : (
              <a
                className="navbar-brand"
                aria-current="page"
                href="/login/signup"
              >
                <GiArchiveRegister></GiArchiveRegister>
              </a>
            )}

            <a className="navbar-brand" href="/">
              <img className="logo" src={logo} alt="logo" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
