import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {
  // defining the states , always do before the return
  const [emailId, setEmailId]= useState("")
  const [password, setPassword]= useState("")

  // We are making a handlelogin function which when click on login button will send the data in backend for login
  // That's why we use axios , which helps in making this request . Its better than fetch.post() since it doesn't require to manually convert into json which fetch needs to do
  const handleLogin= async ()=>{
    try {
        const res= await axios.post('http://127.0.0.1:5000/login',{
          emailId,
          password
        },{
          withCredentials:true
        })
    } catch (error) {
      console.error(error);
      
    }
  }
  return (


    <div className='flex justify-center'>
     <div className="card bg-base-300 w-96 shadow-sm my-10">
  <div className="card-body">
    <h2 className="card-title justify-center">Login Page</h2>
    <div>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Email ID </legend>
  {/* we are making usestate for emailid */}
  <input type="text" className="input"
   value={emailId}
   onChange={(e)=> setEmailId(e.target.value)}
  />
</fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Password  </legend>
  <input type="text" className="input" 
  value={password}
  onChange={(e)=> setPassword(e.target.value)}
  />
</fieldset>
    </div>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary " onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
