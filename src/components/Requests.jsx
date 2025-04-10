import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  // user can either accept or reject the incoming requests
    
  const reviewRequest= async(status, _id)=>{
        try {
            const res= await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
      
        //That _id is the ID of the incoming request you just accepted or rejected.
        dispatch(removeRequest(_id))
        
        } catch (error) {
            console.error(error.message);
            
        }
    }
  
  
    // user can see their connections
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

      // adding to redux store
      console.log(res.data.data);

      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error("gaurav see this error" + error.message);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center my-10">No request found Gaurav</h1>;
  return (
    <div className="text-center">
      <h1 className="text-bold text-5xl"> Requests </h1>
      {requests.map((incomingrequest) => {
        const { _id, firstName, lastName, age, gender, about, photo } =
          incomingrequest.fromUserId;
        return (
          <div
            key={_id}
            className="flex items-center justify-between m-4 p-4 rounded-lg  bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img src={photo} alt="photo" className="rounded-full w-20 h-20" />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " , " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="card-actions justify-center" >
              <button className="btn btn-primary" onClick={()=>reviewRequest("accepted", incomingrequest._id)}>Accept</button>
              <button className="btn btn-secondary" onClick={()=>reviewRequest("rejected",incomingrequest._id)}>Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
