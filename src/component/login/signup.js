/* eslint-disable no-undef */
import React from "react";
import "../../App.css";
import logo from "../../logo1.svg";

const Signup = () => {
  let userNew = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    image: "",
  };
  // const passVal = document.getElementById("password");
  // if (!userNew.password || userNew.password.length < 6) {
  //   alert(`*Password must have 6 letters  *`);
  // }

  // if (userNew.email) {
  //   var reges =
  //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   var res = reges.test(userNew.email);
  //   if (!res) {
  //     alert("Must enter  valid email   *");
  //   }
  // } else {
  //   alert("Must enter  valid email   *");
  // }
  // if (!userNew.name || userNew.name.length < 2) {
  //   alert = "Name must have at leat two letters";
  // }

  let newUser = () => {
    fetch("http://localhost:5000/users/newUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userNew),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          window.location = "/";
        }
      });
  };

  return (
    <div dir="rtl">
      <div className="row">
        <div className="col-12 mt-4">
          <h1>
            <img className="logo" src={logo} alt="logo" />
            Signup its free
          </h1>
        </div>
      </div>
      <form className="signupform" Validate="validate">
        <div class="mb-3">
          <label for="firstName" class="form-label">
            firstName
          </label>
          <input
            onChange={(e) => {
              userNew.firstName = e.target.value;
            }}
            type="text"
            class="form-control"
            id="firstName"
            placeholder="Insert First Name"
            aria-describedby="firstName"
          />
          <div id="firstName" class="form-text"></div>
        </div>
        <div class="mb-3">
          <label for="Last name" class="form-label">
            lastName
          </label>
          <input
            onChange={(e) => {
              userNew.lastName = e.target.value;
            }}
            required
            type="text"
            class="form-control"
            id="Last name"
            placeholder="Insert Last name"
            aria-describedby="Last name"
          />
          <div id="Last name" class="form-text"></div>
        </div>
        <div class="mb-3">
          <label for="Email" class="form-label">
            Email address
          </label>
          <input
            onChange={(e) => {
              userNew.email = e.target.value;
            }}
            required
            Validate="validate"
            type="email"
            class="form-control"
            id="Email"
            placeholder="Insert Email"
            aria-describedby="Email"
          />
          <div id="Email" class="form-text"></div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            onChange={(e) => {
              userNew.password = e.target.value;
            }}
            required
            type="password"
            class="form-control"
            placeholder="Insert Password"
            id="password"
          />
          <div id="password" class="form-text"></div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            image
          </label>
          <input
            onChange={(e) => {
              userNew.image = e.target.value;
            }}
            required
            class="form-control"
            id="exampleNickname1"
            placeholder="Insert Nick name"
            aria-describedby="nickname"
            type="file"
            dir="ltr"
          />
          <div id="emailHelp" class="form-text"></div>
        </div>
      </form>
      <button onClick={newUser} type="submit" class="btn btn-primary">
        Submit
      </button>
    </div>
  );
};

export default Signup;
