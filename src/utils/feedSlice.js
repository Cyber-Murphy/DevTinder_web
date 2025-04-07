import { createSlice } from "@reduxjs/toolkit";

const feedSlice= createSlice({
    name:"feed",
    initialState:[],
    reducers:{
        addFeed:
            (state,actions)=>{
                console.log("🔄 Updating feed with:", actions.payload);
                return actions.payload
            },
        removeFeed:(state,actions)=>null
        
    }
})

export const {addFeed,removeFeed}= feedSlice.actions
export default feedSlice.reducer