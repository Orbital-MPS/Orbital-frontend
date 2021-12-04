import React from 'react'
import * as tf  from  '@tensorflow/tfjs';
import  *  as  speech  from '@tensorflow-models/speech-commands'
import {useState,useEffect}  from  'react'


const Speech = ({setAction}) => {

    const[model,setModel]=useState(null);
    // const[action,setAction]=useState(null);
    const[labels,setLabels]=useState(null);
    
    const  loadModel  = async()=>{
        const recognizer  = await  speech.create('BROWSER_FFT');
        console.log('Model  loaded');
        await  recognizer.ensureModelLoaded()
        console.log(recognizer.wordLabels())
        setModel(recognizer)
        setLabels(recognizer.wordLabels());
    }

    useEffect(() => {loadModel()}, [])


    function  argMax(arr){
        return  arr.map((x,i)=>[x,i]).reduce((r,a)=>(a[0]>r[0] ?  a:r))[1];
    }


    const recognizeCommands  =  async()=>{
        console.log('Listening  for  commands');
        model.listen(result=>{
            console.log(result)
            setAction(labels[argMax(Object.values(result.scores))])
        },{includeSpectogram:true,probabilityTreshhold:0.7})  
       
        setTimeout(()=>model.stopListening(),30000)
    }
   
    return (
        <div  className='border-2 border-black'>
            
            <button  onClick={recognizeCommands}  className='select-none  border-2  border-black'>Listening  for  command</button>
            {/* {action ? <div>{action}</div> : <div>No action detected  </div>} */}
        </div>
    )
}

export default Speech
