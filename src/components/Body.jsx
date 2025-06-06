import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { addUser } from '../utils/userSlice'
import Footer from './Footer'

const Body = () => {
const dispatch=useDispatch()
const navigate=useNavigate()

const fetchUser= async()=>{
  try {
    const res= await axios.get(BASE_URL+'/profile/view',{
      withCredentials:true    // to send the cookies
    })
    // adding the user data into the redux store
    
    dispatch(addUser(res.data))


  } catch (error) {
    if(error.response?.status === 401){
      navigate('/login')
    }
  }  
}
useEffect(()=>{
  fetchUser()
},[])

  return (
    
    <div className="min-h-screen flex flex-col"> {/* Makes footer stick to bottom */}
    <NavBar />
    <div className="flex-grow">
      <Outlet />
    </div>
    <Footer /> 
  </div>

  )
}

export default Body
