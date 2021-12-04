import React from "react";
import { useEffect } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { useState } from "react";
import { w3cwebsocket as w3s } from "websocket";
import LiveChart from "./Charts";
import { FaTemperatureHigh as TM } from "react-icons/fa";
import Leaf from "./Gps";
import { useRef } from "react";
import Speech from "./Tensorflow/Speech";
import Login from "./Login";
import axios from "axios";

const Movement = () => {
  console.log("rubd");
  const [isLogin, setIsLogin] = useState(false);

  const [client, setClient] = useState();
  const [temp, setTemp] = useState(0);
  const [gps, setGps] = useState([0, 0]);
  const gpsCount = useRef(0);
  const [action, setAction] = useState(null);
  const [counter, setCounter] = useState(0);
  const [action1, setAction1] = useState("");
  const [fromserver,setFromserver]  =  useState('');
  const [users,setUsers] =  useState([])
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const verified = await axios.get("/users/verify", {
          headers: { Authorization: token },
        });
        console.log({ verified });
        if (verified.data === true) {
          setIsLogin(true);
        }
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);
  useEffect(() => {
    //  Run websocket  CLIENT  and keep it active while client  is  connected
    if (!client) {
      return;
    }
    client.onopen = () => {
      console.log("websocket client connected"); //  Proccess  on  Open connection  with  the  client and  listen for  messages
      client.onmessage = (message) => {
        //  Send  listen  for  events  from  and  to   the  server
        const dataFromServer = JSON.parse(message.data); //  Parse  the incoming messages
        console.log("this  are  all  arrays", dataFromServer);
        setFromserver(dataFromServer.n_list);
        switch (
          dataFromServer.type //  Switch  between  different types  of  messages  and render  it  to  the  front end
        ) {
          case "temp": //  Getting  temperature  data from microcontroller
            setTemp(...[dataFromServer.temp]); //  Layout it
            break;
          case "gps": //  Get GPS latitude  and  longitude from device
            gpsCount.current++;
            if (gpsCount.current == 5) {
              setGps([dataFromServer.latitude, dataFromServer.longitude]);
              gpsCount.current = 0;
            }
            // console.log('LOCATION :', )
            console.log("COUNT :", gpsCount.current); // Add more feautures
            break;
            case 'left':
            setUsers(old=>[...old,'gosho'])
            break;
          default:
            break;
        }
      };
    };
  }, [client]);

  useEffect(() => {
                           //wss://gentle-thicket-67896.herokuapp.com/
    const frontclient = new w3s("ws://localhost:5000/"); //  Initialize  the client
    setClient(frontclient); //  Connect  client  with the server
    
  }, []);

  const Run = () => {
    //  Left  function  send  data to  the  server
    client.send(
      JSON.stringify({
        x: 160,
        type:'left'
      })
    );
  };
  const Stop = () => {
    // Set  default
    client.send(
      JSON.stringify({
        x: 120,
        type:'forward'
      })
    );
  };
  const Up = () => {
    //  Forward  function
    client.send(
      JSON.stringify({
        y: 100,
      })
    );
  };
  useEffect(() => {
    if (!action1) return;

    // setup interval for the action and perform it
    const handle = setInterval(() => {
      switch (action1) {
        case "Up":
          setCounter((c) => c + 1);
          break;
        case "Down":
          setCounter((c) => c - 1);
          break;
        default:
      }
      console.log(`Doing ${action1}...`, Date.now());
    }, 1000);

    // action changed / cleared => clear interval with old action running...
    return () => {
      console.log("Action stopped!");
      clearInterval(handle);
    };
  }, [action1]);
  const onPlusEnter = () => {
    setAction("Up");
  };

  const onMinusEnter = () => {
    setAction("Down");
  };

  // stop interval
  const onMouseLeave = () => {
    setAction(""); // clear action and stop timer
  };

  useEffect(() => {
    if (action === "go") {
      Up();
    }
    console.log("rUN");
  }, [action]);
  return (
    <div className="fixed w-screen  ">
      {isLogin ? (
        
        <div className="sm:h-screen  sm:grid grid-cols-5 grid-flow-col gap-4 border-2 border-black pt-14 px-4 pb-4  ">
          <Leaf coordinate={gps} ></Leaf>
          <div className="row-start-1 row-end-2   col-start-1 col-end-2 border-2 border-black  sm:row-start-1 sm:row-end-2 ">
            <LiveChart temp={temp} />
          </div>

          <div >
          
          </div>

          <div className="col-span-1  ">
            <div
              onMouseDown={() => Run()}
              onMouseUp={() => Stop()}
              className="  border-black border-2 h-full  flex  items-center  place-content-evenly   "
              type=""
            >
              <div className="">

              <BsArrowLeftCircleFill size={70} />
              </div>
              <BsArrowRightCircleFill size={70} />
            </div>
          </div>
          <div className="col-start-5 col-end-6 row-start-1  max-h-screen row-end-4   border-2 border-black overflow-y-scroll  scrollbar-hide  h-max select-none">LOGS <hr/>{users.map(u=><div  className="overflow-hidden">{u}:</div>)}</div>
          
          <div className="col-start-6 col-end-5 border-2 border-black grid place-items-center">
            <div
              onMouseDown={() => Up()}
              className="  grid justify-items-center  m-6"
              type=""
            >
              <BsArrowUpCircleFill size={70} />
            </div>
            <div className="  grid justify-items-center m-2">
              <BsArrowDownCircleFill size={70} />
            </div>
          </div>
          <div className="col-start-2 col-end-5 row-start-1  row-end-4 border-2 border-black select-none">
            {fromserver};
            5
          </div>
          <Speech setAction={setAction} />
          {action ? <div  className="border-2  border-black">{action}</div> : <div  className="select-none border-2  border-black">No action detected </div>}
        </div>
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
      
    </div>
  );
};

export default Movement;
