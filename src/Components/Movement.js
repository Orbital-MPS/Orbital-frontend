import React from "react";
import { useEffect,useRef } from "react";
import { BsArrowRightCircleFill as  Rmove } from "react-icons/bs";
import { BsArrowLeftCircleFill as  Lmove} from "react-icons/bs";
import { BsArrowUpCircleFill  as Umove } from "react-icons/bs";
import { BsArrowDownCircleFill as  Dmove } from "react-icons/bs";
import { useState } from "react";
import { w3cwebsocket as w3s } from "websocket";
import LiveChart from "./Charts";
import { FaTemperatureHigh as TM } from "react-icons/fa";
import Leaf from "./Gps";
// import { useRef } from "react";
import Speech from "./Tensorflow/Speech";
import Login from "./Login";
import axios from "axios";
import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import  {shuffle} from  'lodash'


const Movement = ({setIsLogin,isLogin}) => {

  const colors = [
    "text-indigo-500",
    "text-blue-500",
    "text-green-500",
    "text-red-500",
    "text-yellow-500",
    "text-pink-500",
    "text-purple-500",
];

const [color,setColor] = useState(null);
  const referenceLogs = useRef();



    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [client])
  console.log("rubd");
  

  const [client, setClient] = useState();
  const [temp, setTemp] = useState(0);
  const [gps, setGps] = useState([50.979492,11.323544 ]);
  const gpsCount = useRef(0);
  const [action, setAction] = useState(null);
  const [counter, setCounter] = useState(0);
  const [action1, setAction1] = useState("");
  const [fromserver, setFromserver] = useState('');
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(true);


  const websocketURL =  process.env.NODE_ENV  ==  'development' ? process.env.REACT_APP_DEV_WEBSOCKET : process.env.REACT_APP_PROD_WEBSOCKET   


  const Show = () => {

console.log(websocketURL);

    setShow(!show);
    console.log("object");
  };
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        //https://gentle-thicket-67896.herokuapp.com/users/verify  prod
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
  
  useEffect(()=>{
    if(!referenceLogs.current){
      return
    }
    // console.log(    referenceLogs.current.scrollHeight);/
    const divlogs = referenceLogs.current
    divlogs.scrollTop = divlogs.scrollHeight

  },[users])
  useEffect(() => {
    //  Left websocket  CLIENT  and keep it active while client  is  connected
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
          case "left":
            // const jwt = localStorage.getItem("tokenStore");
            //  const  decoded  =  jwt_decode(jwt)
            //  console.log(decoded.name);
            setUsers((old) => [...old, dataFromServer]);
            break;
            case 'right':
            
            setUsers((old) => [...old, dataFromServer]);
            break;
          default:
            break;
        }
      };
    };
  }, [client]);
  
 
  useEffect(() => {
    //wss://gentle-thicket-67896.herokuapp.com/  PROD
    //ws://localhost:5000
    const frontclient = new w3s(websocketURL); //  Initialize  the client
    setClient(frontclient); //  Connect  client  with the server
  }, []);

  const Left = (forward) => {
    //  Left  function  send  data to  the  server
    const jwt = localStorage.getItem("tokenStore");
    const  decoded  =  jwt_decode(jwt)
    client.send(
      JSON.stringify({
        x: 160,
        type: "left",
        user:decoded.name,
        forward,
        color:decoded.color
      

      })
    );
  };
  const Right = (forward) => {
    // Set  default
    const jwt = localStorage.getItem("tokenStore");
    const  decoded  =  jwt_decode(jwt)
    console.log(decoded);
    client.send(
      JSON.stringify({
        x: 120,
        type: "right",
        user:decoded.name,
        forward,
        color:decoded.color
        

      })
    );
  };
  const Up = () => {
    const jwt = localStorage.getItem('tokenStore');
    const decoded = jwt_decode(jwt)
    console.log('decoded token',decoded)
    //  Forward  function
    client.send(
      JSON.stringify({
        y: 100,
        type:'up',
        user:decoded.name,
        color:decoded.color

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
  console.log(fromserver)
  return (
    <div className="fixed w-screen h-max">
      {isLogin ? (
        <div className="relative w-screen flex  items-stretch">
          <Sidebar show={show} />

          <div className="sm:h-screen  sm:grid grid-cols-5 grid-flow-col gap-4 border-2 border-black pt-14 px-4 pb-4    ">
            
            <div className="z-0">
              <Leaf coordinate={gps}></Leaf>
              </div>
            <div className="row-start-1 row-end-2   col-start-1 col-end-2 border-2 border-black  sm:row-start-1 sm:row-end-2 ">
              <LiveChart temp={temp} />
            </div>

            <div className="col-span-2 md:h-32  lg:h-full">
              <div
                className="  border-black border-2 h-full  flex  items-center  place-content-evenly   "
                
              >
                <div className="" 
                onMouseDown={() => Left(true)}
                onMouseUp={() => Right(false)}
                >
                  <Lmove size={70} />
                </div>
                <div 
                onMouseDown={() => Right(true)}
                onMouseUp={() => Left(false)}
                      >

                <Rmove size={70} />
                </div>
              </div>
            </div>
            <button
              onClick={() => Show()}
              className="absolute  top-10  right-10 z-1"
            >
              Menu
            </button>
            <div className="col-start-5 col-end-6 row-start-1  max-h-72 row-end-4   border-2 border-black overflow-y-scroll  scrollbar-hide   select-none" ref={referenceLogs}>
              
              LOGS <hr />

              {users.map((u) => (  
                u.forward &&  <div className={`overflow-hidden  ${u.color} text-xl  flex`}>{u.user}says: 
                {u.type ==  'right' ? <div className="ml-5 relative top-2"><Rmove  size={15}/></div> :  ''  } 
                {u.type ==  'left' ? <div className="ml-5 relative top-2"><Lmove  size={15}/></div> :  ''  }
                 </div>
              ))}
            </div>

            <div className="col-start-6 col-end-5 border-2 border-black grid place-items-center">
              <div
                onMouseDown={() => Up()}
                className="  grid justify-items-center  m-6"
                type=""
              >
                <Umove size={70} />
              </div>
              <div className="  grid justify-items-center m-2">
                <Dmove size={70} />
              </div>
            </div>



            <div className="col-start-2 col-end-5 row-start-1  row-end-4 border-2 border-black select-none">
              {fromserver}
            </div>




            <Speech setAction={setAction} />
            {action ? (
              <div className="border-2  border-black">{action}</div>
            ) : (
              <div className="select-none border-2  border-black">
                No action detected{" "}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
     
    </div>
  );
};

export default Movement;
