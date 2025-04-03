// creating a slice

import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:"User",
    initialState:null,
    reducers:{
        addUser:(state,actions)=>{
            return actions.payload
        },
        removeUser:(state,actions)=>{
            return null
        }
    }
})

export const {addUser,removeUser} =userSlice.actions

export default userSlice.reducer
