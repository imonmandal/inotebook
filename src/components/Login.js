import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault(); // To prevent reload of page
    let res = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (res.status === 200) {
      res = await res.json();
      localStorage.setItem("token", res.authToken);
      navigate("/"); // to redirect
      props.showAlert("Logged in Successfully", "success");
    } else {
      res = await res.json();
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <>
      <h1 className="my-3">Login</h1>
      <form className="w-75 my-5" onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fs-2">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-2">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button
          disabled={!(credentials.email.length && credentials.password.length)}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </>
  );
};
