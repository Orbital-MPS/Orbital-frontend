import React from "react";

const Home = () => {
  return (
    <>
      
      <div className=" text-black w-max h-max text-lg">

        <video
          src={
            process.env.PUBLIC_URL + "/video/pexels-pavel-danilyuk-8084623.mp4"
          }
          type="video/mp4"
          autoPlay
          muted
          loop
          id="myVideo"
          className="fixed w-full "
        ></video>
      </div>
      <div className="absolute w-full h-full   bg-opacity-70 bg-black " >
  <header className="text-white">OVERLAYER</header>
</div>
    </>
  );
};

export default Home;
