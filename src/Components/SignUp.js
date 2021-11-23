import React from 'react'
import {useState} from 'react'
const SignUp = () => {
    const initial = {
        name:'',
        email:'',
        password:''
    }
    const [account,setAccount]=useState(initial)
    
    // useEffect(() => {
    //     // redirect to home if user is authenticated
    //     if (user) Router.replace("/");
    //   }, [user]);
    
      
    const submitHandler=(e)=>{
        e. preventDefault() 
        console.log(account)
        
    }
    const onChangehandler = (e)=>{
        e.preventDefault()
        setAccount({name:e.target.value})
    }
    return (
        <div className=''>
                   <div className='grid grid-cols-[2fr]'>
         <form onSubmit={submitHandler}>
  <label>
    Name:
    <input 
    type="text"
    name="name"
    onChange={onChangehandler}

    
    />
  </label>
  <label>
    Email:
    <input type="email" name="email" />
  </label>
  <label>
    Password:
    <input type="password" name="password" />
  </label>
  <input type="submit" value="Submit" />
</form>

            
        </div>
        </div>
    )
}

export default SignUp
