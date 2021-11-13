import React, { Component, useState } from "react";
import "../../App.css";
import logo from "../../logo1.svg";
import http from "../../services/http";
import { toast } from "react-toastify";
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
  const notify = (message) => toast(message);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  if (!emailValid && email.includes("@")) {
    setEmailValid(true);
  }
  if (emailValid) {
    if (!email.includes("@")) {
      setEmailValid(false);
    }
  }
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  let userExists = async () => {
    // var reges =
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // var res = reges.test(email);
    // const passVal = document.getElementById("exampleInputPassword1");

    // if (passVal.value < 5) {
    let login = await http
      .post("http://localhost:5000/users/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.status === "401") {
          return console.log(response.data);
        }
        window.location = "/";
      });
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
      <form className="loginform">
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
            }}
          />
        </div>

        <button onClick={userExists} class="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
