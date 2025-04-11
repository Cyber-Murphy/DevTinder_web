import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'

const Usercard = ({user}) => {
  if(!user) return null
  const dispatch=useDispatch()
    // Now we will make user can send interested or ignored requests to other users
  
    const handlesendRequest=async(status,userId)=>{
      try {
        const res= await axios.post(BASE_URL+'/request/send/'+status+"/"+userId ,{},{withCredentials:true})
      // now we want once we sent the interested or ignored then the card of that user should go away and the next user's card should display
      // this id is coming from the      <Usercard user={feed[0]}/>
      
        dispatch(removeUserFromFeed(user._id))


      } catch (error) {
        console.error(error.message+"gaurav see");
        
      }
    }
    
    
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={user.photo}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.firstName +" "+ user.lastName} </h2>
    { user.age && user.gender && <p>{user.age +" "+user.gender}</p>}
    <p> {user.about}</p>
    <div className="card-actions justify-center">
      
      <button className="btn btn-primary" onClick={()=>handlesendRequest("ignored",user._id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handlesendRequest('interested',user._id)}>Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Usercard
