import React from "react";

const Home = () => {
  return (
    <div className="overflow-y-scroll scrollbar-hide h-screen">
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
        <section className="h-screen relative grid grid-cols-3 gap-4 border-2 border-black ">
          <div className="cols-span-3 border-2 border-black">
            <p>Construction's part</p>
            </div>SECTI
        </section>
    </div>
  );
};

export default Home;
