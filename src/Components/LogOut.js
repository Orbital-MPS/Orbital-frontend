import React from 'react'
import { Navigate,Redirect, useNavigate} from 'react-router-dom';
const LogOut = ({logout}) => {

    const exit = useNavigate()
    const Exit  = ()  =>{
        console.log(Navigate);
        localStorage.removeItem("tokenStore");
        logout(false);
        return exit('/');
        
    }
    return (
        <button  onClick={()=>Exit()} className='text-white fancy-link font-anton'>
             
            LOG  OUT
        </button>
    )
}

export default LogOut
