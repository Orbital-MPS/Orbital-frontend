import React from "react";
import  Sidebar from  './Sidebar'
import {useState}  from  'react'
const Home = () => {
  // const[show,setShow]=useState(true);
  // const  Show =  ()=>{
  //    setShow(!show)
  //     console.log('object');
  // }
  const websocketURL1 =  process.env.NODE_ENV ==  'development' ? process.env.REACT_APP_DEV_WEBSOCKET : process.env.REACT_APP_PROD_WEBSOCKET 
  console.log('here',websocketURL1) 
  console.log(process.env.NODE_ENV)
  
  
  return (
    
    <div className="overflow-y-scroll scrollbar-hide h-screen  w-screen fixed ">
      {/* <div className=" text-black w-max h-max text-lg">
        <video
          src={
            "/video/pexels-pavel-danilyuk-8084623.mp4"
            // "https://master.d3ksrba71tzc64.amplifyapp.com/video/pexels-pavel-danilyuk-8084623.mp4"
          }
          type="video/mp4"
          autoPlay
          muted
          loop
          id="myVideo"
          className="fixed w-full "
        ></video>
      </div> */}
      <div className="relative w-full h-screen z-0 font-anton sm:tracking-widest1  grid  place-items-center  ">
        <header className="    grid items-center scrollbar-hide text-5xl  sm:text-8xl  md:text-9xl">
          
          <div className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400  to-blue-600 myline">ORBITAL</div> 

    
        </header>
      </div>
       
    </div>
  );
};

export default Home;
