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
import GoodTrick from './Place/'


const Movement = () => {

    
    
     console.log('rubd')   
    
    const [client,setClient] = useState();
     const [temp,setTemp] = useState(0);
     useEffect(() => {
         if(!client){
            return
        }
             client.onopen = ()=>{
                 console.log('websocket client connected')
                 
                 
                 client.onmessage = (message)=>{
                     
              console.log('Parsed messageg',JSON.parse(message.data))
              const dataFromServer = JSON.parse(message.data);
              if(dataFromServer.temp){

                  setTemp(...[dataFromServer.temp])
              }   
            }
          }
         
     }, [client])

     useEffect(() => {
        
        const frontclient = new w3s('ws://localhost:3000');
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
    return (

      <div className='grid grid-cols'> 
              <TM size={25} />{temp}
           <div className=''>
            <LiveChart temp={temp}/>
           </div>

            <div className='flex justify-around border-2 border-black'>
                <div className=''>
                      <div onMouseDown={()=>Run()} onMouseUp={()=>Stop()} className='w-max border-2 border-black' type=''>
                      <BsArrowLeftCircleFill  size={70}/>
                      </div>
                      <div>
                      <BsArrowRightCircleFill  size={70}/>
                      </div>
               </div>
                <div>
                      <div onMouseDown={()=>Up()} className='w-max border-2 border-black' type=''>
                      <BsArrowUpCircleFill  size={70}/>
                      <BsArrowDownCircleFill  size={70}/>
                      </div>
                </div>
            </div>
        
        </div>
    )
}

export default Movement
