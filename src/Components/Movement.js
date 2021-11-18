import React from 'react'
import {useEffect} from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { BsArrowUpCircleFill } from 'react-icons/bs';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import {useState} from 'react';
import { w3cwebsocket as w3s } from "websocket";
import LiveChart from './Charts';
import {FaTemperatureHigh as TM} from 'react-icons/fa'
import Leaf from './Gps'
import {useRef} from 'react';


const Movement = () => {

    
    
     console.log('rubd')   
    
    const [client,setClient] = useState();
     const [temp,setTemp] = useState(0);
     const [gps,setGps]=useState([0,0]);
     const gpsCount = useRef(0);
     useEffect(() => {
         if(!client){
            return
        }
             client.onopen = ()=>{
                 console.log('websocket client connected')
                 
                 
                 client.onmessage = (message)=>{                   
              const dataFromServer = JSON.parse(message.data);
                switch(dataFromServer.type){
                  case 'temp':
                  setTemp(...[dataFromServer.temp])
                 
                break;
                case 'gps':
                gpsCount.current++;
                if(gpsCount.current == 5){
                  setGps([
                    
                    dataFromServer.latitude,
                    dataFromServer.longitude
                  ]
                  )

                  gpsCount.current = 0;
                }
                // console.log('LOCATION :', )
                console.log('COUNT :', gpsCount.current)
                
                break;
                default:
                  break;
              }
            }
          }
         
     }, [client])

     useEffect(() => {
        
        const frontclient = new w3s('ws://localhost:5000');
        setClient(frontclient);
   
     }, [])


    
    const Run = ()=>{
        client.send(JSON.stringify({
          x:160
        }))
    }
    const Stop = ()=>{
      client.send(JSON.stringify({
        x:120
      }))
    }
    const Up = ()=>{
      client.send(JSON.stringify({
        y:100
      }))
    }
    const Back = ()=>{
      
    }
    return (
    <div className='h-screen  grid grid-cols-4 grid-flow-col gap-4 border-2 border-black pt-14 px-4 pb-4'> 
              <Leaf coordinate={gps}></Leaf>
                      <div className="row-start-1 row-end-1 col-start-1 col-end-2 border-2 border-black">
                        <LiveChart temp={temp}/>
                      </div>

            <div className="">3</div>
          
            <div className="col-span-1 border-2 border-black ">
                      
                      <div onMouseDown={()=>Run()} onMouseUp={()=>Stop()} className='  border-black border-2 flex justify-contet ' type=''>
                                        <BsArrowLeftCircleFill  size={70}/>s
                      <BsArrowRightCircleFill  size={70}/>
                      </div>
                 
            </div>
                      
            <div className="col-start-4 col-end-5 border-2 border-black grid place-items-center">
            <div onMouseDown={()=>Up()} className='border-2 border-black  grid justify-items-center  m-2' type=''>
                              <BsArrowUpCircleFill  size={70}/>
                              </div>
            <div onMouseDown={()=>Back()} className='border-2 border-black  grid justify-items-center m-2'>
                              <BsArrowDownCircleFill  size={70}/>
            </div>
            </div>
            <div className='col-start-2 col-end-5 row-start-1  row-end-4 border-2 border-black '> 5 </div>

        
    </div>
    )
}

export default Movement
