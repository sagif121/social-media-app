import React, { Component, useState } from "react";
import "../../App.css";
import logo from "../../logo1.svg";
import http from "../../services/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
const Login = () => {
  // let link = "http://localhost:3000/users/userInfo";
  // let [loginDetails, setLoginDetails] = useState(link);
  // let emailValue;
  // let passwordValue;

  // let saveValues = () => {
  //   setLoginDetails({ email: emailValue, passowrd: passwordValue });
  // };

  // let getUser = fetch(link, { method: "GET" })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("data", data);
  //     localStorage.setItem("userDetails", JSON.stringify(data));
  // setLoginDetails(data);
  // });
  // console.log("data from server", loginDetails);
  // let getUser = async () => {
  //   console.log("Start Get User ");
  //   let response = await fetch("http://localhost:3000/users", {
  //     method: "GET",
  //   });
  //   let users = await response.json();
  //   console.log("users", users);
  // };

  // let existsUser = {
  //   email: "sagif21@gmail.com",
  //   passowrd: 123456,
  // };

  // const notify = () => toast("Wow so easy!");

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const [password, setPassword] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);

  let mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let userExists = async () => {
    console.log("login function");
    if (!emailValid && email.includes("@")) {
      setEmailValid(true);
    }
    if (emailValid) {
      if (!email.includes("@")) {
        setEmailValid(false);
        return;
      }
    }

    // if (!mailRegex.test(email)) {
    //   setEmailValid(true);
    // }

    if (password.length < 6) {
      setPasswordValid(true);
    } else {
      passwordValid && setPasswordValid(false);
    }

    // var reges =

    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // var res = reges.test(email);
    // const passVal = document.getElementById("exampleInputPassword1");

    // if (passVal.value < 5) {
    console.log("login function 2");

    let login = await http
      .post("http://localhost:5000/users/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 217) {
          console.log("userExsits");
          console.log(response.data);
          setUserAlreadyExists(true);
          setIncorrect(false);
        } else if (response.status === 200) {
          console.log("All went as well");
          localStorage.setItem("userDetails", JSON.stringify(response.data));
          let userDetails = localStorage.getItem("userDetails");
          console.log("userDetails", userDetails);
          window.location = "/";
        } else if (response.status === 212) {
          setUserAlreadyExists(false);
          setIncorrect(true);
        }
      });
    console.log("login function 3");

    return login;
    // } else {
    //   alert("email or password not valid");
    // }

    // fetch("http://localhost:3000/users/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // }).then((response) => {
    //   if (response.status === "401") {
    //     return console.log(response);
    //   }
    //   window.location = "/";
    // });
  };
  let handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div dir="rtl">
      <div className="row">
        <div className="col-12 mt-4">
          <h1>
            <img className="logo" src={logo} alt="logo" />
            Login
          </h1>
        </div>
      </div>
      <form
        className="loginform"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          {/* {!emailValid && <h4> Your Email Is not valid</h4>} */}
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="Insert Email"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {!emailValid && (
            <span style={{ color: "red" }}>
              Your password should have at least 6 characters
            </span>
          )}
          {userAlreadyExists && (
            <span style={{ color: "red" }}>User dose'nt Exists </span>
          )}
          {incorrect && (
            <span style={{ color: "red" }}>
              Email or password are incorrect{" "}
            </span>
          )}
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Insert Password"
            id="exampleInputPassword1"
            onChange={(e) => {
              setPassword(e.target.value);
              if (password > 5) {
                setPasswordValid(false);
              }
            }}
          />
          {passwordValid && (
            <span style={{ color: "red" }}>
              Your password should have at least 6 characters
            </span>
          )}
        </div>
        {/* {!emailValid ? alert("email or password is not valide") : null} */}
        {/* {passwordValid ? alert("email or password is not valide") : null} */}
        <button onClick={userExists} class="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
