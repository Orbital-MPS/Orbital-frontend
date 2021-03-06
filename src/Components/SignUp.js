import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import  {shuffle}  from  'lodash'
const SignUp = () => {
  const colors = [
    "text-indigo-500",
    "text-blue-500",
    "text-green-500",
    "text-red-500",
    "text-yellow-500",
    "text-pink-500",
    "text-purple-500",
];


  
   
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState({msg:'',text:''});
  
  const  navigate  =  useNavigate();
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {                           //https://gentle-thicket-67896.herokuapp.com/users/register  PROD
      const res = await axios.post("/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
        color:shuffle(colors).pop()
      });
      // setUser({ name: "", email: "", password: "" });
      // setErr({msg:res.data.msg});
      navigate('/projects/api/projects')
    } catch (err) {
      err.response.data.msg && setErr({msg:err.response.data.msg,text:err.response.data.msg.text});
    }
  };
console.log(err.msg);
  return (
    <div className="relative  h-screen     hover:shadow-xl  grid  place-items-center  ">
      <div className="border-2  border-grey-100  p-10  m-10 hover:shadow-xl">
        <div>
          {"" ? (
            ""
          ) : (
            <form
              className="flex flex-wrap w-min text-center gap-6 text-xl"
              onSubmit={registerSubmit}
            >
              <label>
                Name:
                <input
                  className="placeholder-shadow-xl outline-none text-center border-b-2  "
                  type="text"
                  name="name"
                  id="register-name"
                  placeholder="...Your Asterix..."
                  value={user.name}
                  onChange={onChangeInput}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  className="placeholder-shadow-xl outline-none text-center border-b-2"
                  type="email"
                  name="email"
                  id="register-email"
                  placeholder="Email"
                  required
                  value={user.email}
                  onChange={onChangeInput}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  id="register-password"
                  placeholder="Password"
                  required
                  value={user.password}
                  autoComplete="true"
                  onChange={onChangeInput}
                  className="placeholder-shadow-xl outline-none text-center border-b-2"
                />
              </label>

              <button type="submit" value="Submit" className="m-auto">
                Register
              </button>
              <h3 className="fixed  top-20  right-0   bg-purple-400 opacity-75">
                {err.msg  == 'Sign up Success' ? (
                  <div  className="w-52  ">
                    
                  <p>{err.msg}</p>
                 
                    </div>
                ) : <div>
                  <p>
                  

                    <a
                    className="flex  flex-wrap "
                    //https://master.d3ksrba71tzc64.amplifyapp.com/projects/api/projects
                    href="http://localhost:3001/projects/api/projects"
                    >
                        {err.msg}
                        
                    
                  </a>
                    </p>
                
                </div>
                
                }
              </h3>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
