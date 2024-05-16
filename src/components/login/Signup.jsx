import axios from "axios";
import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./signup.css";
import { Link, Navigate } from "react-router-dom";
import { server, Context } from "../../main.jsx";

const Signup = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();
    if(email==="" || password===""){
      toast(`Enter the details first!`, {
        autoClose: 1000,
        closeOnClick: false,
        pauseOnHover: false,
        theme: "dark",
      });
      return ;
    }
    const {data} = await axios.post(
      `${server}/users/register`,
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );
    if(data.success) setIsAuthenticated(true);
    // console.log(data);
    toast(`${data.message}`, {
      autoClose: 1000,
      closeOnClick: false,
      pauseOnHover: false,
      theme: "dark",
    });
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="form-container">
      <form action="post" className="form" onSubmit={formSubmit}>
        {/* <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button className="form-button" type="submit">Submit</button> */}
        <h3>Sign Up</h3>

        <label >Name</label>
        <input type="text" placeholder="Name"  value={name} onChange={(e)=>setName(e.target.value)}/>

        <label >Email</label>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" placeholder="Password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>

        <div className="button-submit">
        <button type="submit">Register</button>
        {/* <button type="submit">Register</button> */}

 <Link className="links" to="/login"><button>Log In</button></Link>
        </div>
      </form>
      <ToastContainer closeButton="false" />
    </div>
  );
};

export default Signup;