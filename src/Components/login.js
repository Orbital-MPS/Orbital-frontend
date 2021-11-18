import React from 'react'
import { useState,useEffect } from 'react'
const Login = () => {

    const [data,setData]= useState({
        username:'',
        password:''
    })
//    


    const Check = async()=>{
        const response = await fetch('http://localhost:3000/',{
            method:"POST",
            
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        });
        console.log(response)
        // return response;
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        
        Check();
    }
    const handleChange = (e)=>{
        setData({username:e.target.value,password:e.target.value})
     
    }
    return (
        <div className='flex flex-row'>
            <form onSubmit={handleSubmit}>

            <label className='p-2'>
            Username:
            <input type='username' className='border-2  border-black' id="1" 
            onChange={(e)=>handleChange(e)}
            ></input>
            </label>
            <label className='p-3'>
            Password:
            <input type='password' className='border-2  border-black'
            onChange={(e)=>handleChange(e)}
            ></input>
            </label>
            <button >Log In</button>
            </form>
        </div>
    )
}

export default Login
