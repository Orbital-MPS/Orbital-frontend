import React from 'react'
import { Navigate,Redirect} from 'react-router-dom';
const LogOut = () => {
   
    const Exit  = ()  =>{
        console.log(Navigate);
        return <Navigate to="/" />;
        
    }
    return (
        <button  onClick={()=>Exit()} className='text-white fancy-link font-anton'>
             
            LOG  OUT
        </button>
    )
}

export default LogOut
