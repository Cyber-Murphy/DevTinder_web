import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Usercard from "./Usercard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  

  let getFeed = async () => {
  try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    
  } catch (error) {
    console.error(error.message);
  }
}

  useEffect(() => {
    getFeed();
  }, []);

  return(
    // feed && means only loads when feed is not empty
  feed &&  (
  <div className="flex justify-center my-10">
    {/* the feed is coming from here   const feed = useSelector((store) => store.feed);
 */}
    <Usercard user={feed[0]}/>
    </div>
  ))
};

export default Feed;
