import React from "react";
import { useState } from "react";
import axios from "axios";
import SignUp from "./SignUp";

const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");


  
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setErr(res.data.msg);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };
  const CustomNotification  =  ()=>{
    if(!err)  return  err;
    return  err;
  }
  const [onLogin, setOnLogin] = useState(false);
  const style = {
    visibility: onLogin ? "visible" : "hidden",
    opacity: onLogin ? 1 : 0,
  };
  return (
    <>
     
     <div className='relative  h-screen     hover:shadow-xl  grid  place-items-center  '>
          <div  className='border-2  border-grey-100  p-10  m-10 hover:shadow-xl'>
         
         <div>
          
          <form onSubmit={loginSubmit}>
           
            <input
              type="email"
              name="email"
              id="login-email"
              placeholder="Email"
              required
              value={user.email}
              className='placeholder-shadow-xl outline-none text-center border-b-2'
              onChange={onChangeInput}
            />

            <input
              type="password"
              name="password"
              id="login-password"
              placeholder="Password"
              required
              value={user.password}
              autoComplete="true"
              className="placeholder-shadow-xl outline-none text-center border-b-2"
              onChange={onChangeInput}
            />

            <button type="submit">Login</button>
            <p>
              You don't have an account?
              <span onClick={() => setOnLogin(true)}> <a href="/SignUp"> REGISTER</a></span>
            </p>
            
          </form>
            <h3  className="  absolute  top-20  right-0  animate-wiggle rounded-full bg-purple-400 opacity-75"><CustomNotification/></h3>
          
      </div>
      </div>
      </div>
      <SignUp/>
    </>
  );
};

export default Login;
