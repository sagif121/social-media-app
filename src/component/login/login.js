import React, { Component, useState } from "react";
import "../../App.css";
import logo from "../../logo1.svg";
import http from "../../services/http";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const [password, setPassword] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);

  let mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let userExists = async () => {
    if (!emailValid && email.includes("@")) {
      setEmailValid(true);
    }
    if (emailValid) {
      if (!email.includes("@")) {
        setEmailValid(false);
        return;
      }
    }

    if (password.length < 6) {
      setPasswordValid(true);
    } else {
      passwordValid && setPasswordValid(false);
    }

    let login = await http
      .post("http://localhost:5000/users/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 217) {
          setUserAlreadyExists(true);
          setIncorrect(false);
        } else if (response.status === 200) {
          localStorage.setItem("userDetails", JSON.stringify(response.data));
          let userDetails = localStorage.getItem("userDetails");
          window.location = "/";
        } else if (response.status === 212) {
          setUserAlreadyExists(false);
          setIncorrect(true);
        }
      });

    return login;
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

        <button onClick={userExists} class="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
