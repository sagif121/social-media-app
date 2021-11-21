import { useState } from "react";
import "../../App.css";
import logo from "../../logo1.svg";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    image: "",
  });

  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const [userValidatedState, setUserValidatedState] = useState(false);
  let userValidated = false;
  const [userFailedSignUp, setUserFailedSignUp] = useState(false);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [firstNameError, setFirstNameError] = useState(true);
  const [lastNameError, setLastNameError] = useState(true);
  let mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let newUser = async () => {
    userValidated = false;
    if (!emailError && !firstNameError && !lastNameError && !passwordError) {
      setUserValidatedState(true);
      userValidated = true;
    }

    if (userValidated) {
      let res = await fetch("http://localhost:5000/users/newUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      if (res.status === 400) {
        setUserAlreadyExists(true);

        console.log("userAlreadyExists");
      } else if (res.status === 200) {
        window.location = "/";
      }
    } else {
      setUserFailedSignUp(true);
    }
  };

  //Validate Email
  if (!mailRegex.test(userDetails.email) && userFailedSignUp && !emailError) {
    setEmailError(true);
  }
  //Validate password
  if (userDetails.password.length < 6 && userFailedSignUp && !passwordError) {
    setPasswordError(true);
  }
  //Validate FirstName
  if (userDetails.firstName.length < 2 && userFailedSignUp && !firstNameError) {
    setFirstNameError(true);
  }
  //Validate lastName
  if (userDetails.lastName.length < 2 && userFailedSignUp && !lastNameError) {
    setLastNameError(true);
  }
  //Cancel Mail Error
  if (mailRegex.test(userDetails.email) && emailError) {
    setEmailError(false);
  }

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
      <div className="signupform" Validate="validate">
        <div class="mb-3">
          <label htmlFor="firstName" class="form-label">
            firstName
          </label>

          <input
            onChange={(e) => {
              setUserDetails({ ...userDetails, firstName: e.target.value });

              if (userDetails.firstName.length > 0) {
                setFirstNameError(false);
              }
            }}
            type="text"
            class="form-control"
            id="firstName"
            placeholder="Insert First Name"
            aria-describedby="firstName"
          />
          {firstNameError && userFailedSignUp && (
            <span style={{ color: "red" }}>Please insert full first name</span>
          )}
          <div id="firstName" class="form-text"></div>
        </div>
        <div class="mb-3">
          <label htmlFor="Last name" class="form-label">
            lastName
          </label>
          <input
            onChange={(e) => {
              setUserDetails({ ...userDetails, lastName: e.target.value });
              if (userDetails.lastName.length > 0) {
                setLastNameError(false);
              }
            }}
            type="text"
            class="form-control"
            id="Last name"
            placeholder="Insert Last name"
            aria-describedby="Last name"
          />
          {lastNameError && userFailedSignUp && (
            <span style={{ color: "red" }}>Please insert full last name</span>
          )}
          <div id="Last name" class="form-text"></div>
        </div>
        <div class="mb-3">
          <label htmlFor="Email" class="form-label">
            Email address
          </label>
          <input
            onChange={(e) => {
              setUserDetails({ ...userDetails, email: e.target.value });
            }}
            type="email"
            class="form-control"
            id="Email"
            placeholder="Insert Email"
            aria-describedby="Email"
          />
          {emailError && userFailedSignUp && (
            <span style={{ color: "red" }}>
              Please insert valid mail address
            </span>
          )}
          {userAlreadyExists && (
            <span style={{ color: "red" }}>User already Exists</span>
          )}
          <div id="Email" class="form-text"></div>
        </div>
        <div class="mb-3">
          <label htmlFor="password" class="form-label">
            Password
          </label>
          <input
            onChange={(e) => {
              setUserDetails({ ...userDetails, password: e.target.value });
              if (userDetails.password.length > 5) {
                setPasswordError(false);
              }
            }}
            type="password"
            class="form-control"
            placeholder="Insert Password"
            id="password"
          />
          {passwordError && userFailedSignUp && (
            <span style={{ color: "red" }}>
              Your password should have at least 6 characters
            </span>
          )}
          <div id="password" class="form-text"></div>
        </div>

        <button onClick={newUser} class="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Signup;
