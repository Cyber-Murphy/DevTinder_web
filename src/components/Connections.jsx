import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {

    const dispatch=useDispatch()
    const connections=useSelector((store)=>store.connections)
    const fetchConnections= async()=>{
        try {
            const res= await axios.get(BASE_URL+'/user/connections',{
                withCredentials:true
            })
            console.log(res.data.data);
            // data incoming is updated to redux store
            dispatch(addConnections(res.data.data))
            
        } catch (error) {
            console.error('gaurav see this error'+error.message);
            
        }
      
    }
    // this makes sure the components renders only once
   useEffect(()=>{
    fetchConnections()
   },[])

   if(!connections) return

   if(connections.length===0) return <h1>No connections found Gaurav</h1>
  return (
    <div className='text-center'>
      <h1 className='text-bold text-4xl'> Connections </h1>
      {connections.map((key)=>{
        const {_id,firstName,lastName,age,gender,about,photo}= key
        return (
          <div key={_id} className="flex m-4 p-4 rounded-lg  bg-base-300 w-1/2 mx-auto">

            <div >
              <img src={photo} alt="photo" className='rounded-full w-20 h-20' />
            </div>
            <div className="text-left mx-4">
              <h2 className='font-bold text-xl'>{firstName + " "+ lastName}</h2>
              {age &&gender&& <p >{age + " , "+ gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Connections
