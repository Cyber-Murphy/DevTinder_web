import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { addUser } from '../utils/userSlice'

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
      <div>
      <NavBar/>
        <Outlet/>
    </div>
  )
}

export default Body
