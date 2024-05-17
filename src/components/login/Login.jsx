import axios from "axios";
import React, { useState, useContext } from "react";
import { server, Context } from "../../main.jsx";
import { ToastContainer, toast } from "react-toastify";
import "./signup.css";
import { Link, Navigate } from "react-router-dom";
import cookie from "react-cookies";
// import { HashRouter as Router,  Routes, Route} from 'react-router-dom';

const Login = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [cookies, setCookie] = useCookies(['token']);
  const formSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast(`Enter the details first!`, {
        autoClose: 1000,
        closeOnClick: false,
        pauseOnHover: false,
        theme: "dark",
      });
      return;
    }
    const {data} = await axios.post(
      `${server}/users/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (data.success) {
      // Set the cookie
      cookie.save('token', data.token, {
        path: '/',
        maxAge: 2 * 24 * 60 * 60, // 2 days
        secure: true,
        httpOnly: false, // Should be true if setting the cookie from the server
      });
      setIsAuthenticated(true);
    }
    toast(`${data.message}`, {
      autoClose: 1000,
      closeOnClick: false,
      pauseOnHover: false,
      theme: "dark",
    });
  };
  if (isAuthenticated) {
    return <Navigate to={"/watchlist"} />;
  }
  return (
    <div className="form-container">
      <form action="post" onSubmit={formSubmit} className="form login-form">
        <h3>Login Here</h3>

        <label>Username</label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="button-submit">
          <button type="submit">Log In</button>

          <Link className="links" to="/signup">
            <button className="link-btn">Sign Up</button>
          </Link>
        </div>
      </form>
      <ToastContainer closeButton="false" />
    </div>
  );
};

export default Login;
