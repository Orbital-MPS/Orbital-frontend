import "./index.css";
import { BrowserRouter as Router, Route, Routes,Link} from "react-router-dom";
import Movement from "./Components/Movement";

import Login from "./Components/Login";
import Home from "./Components/Home";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const verified = await axios.get("/users/verify", {
          headers: { Authorization: token },
        });
        console.log(verified);
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);
console.log(Routes)
  return (
    <Router>
      <header className="h-max  w-full z-40 bg-gradient-to-t from-blue-300 via-black to-black">
        <ul className="flex border-white border-4  border-opacity-20 max-w-screen flex-row-reverse ">
          <li className="p-2">
            <Link to="/" className="text-white fancy-link font-anton">
              Home
            </Link>
          </li>
          <li className="p-2">
            <Link
              to="/projects/api/projects"
              className="text-white fancy-link font-anton "
            >
              Projects
            </Link>
          </li>

          {/* <li className='p-2'>
              <Link to="/Login" className='text-white fancy-link font-anton'>Login</Link>
            </li> */}
          <li className="p-2">
            <Link to="/SignUp" className="text-white fancy-link font-anton">
              Sign Up
            </Link>
          </li>
        </ul>
      </header>

      <Routes>
        <Route path="/projects/api/projects" element={<Movement />}/>
        <Route path="/Login" element={<Login setIsLogIn={(isLogin, setIsLogin)} />}/>
          {/* <Login setIsLogIn={(isLogin, setIsLogin)} /> */}

        <Route path="/" element={ <Home />}/>
        
      </Routes>
    </Router>
  );
}

export default App;
