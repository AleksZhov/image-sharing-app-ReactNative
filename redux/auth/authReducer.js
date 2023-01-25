import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: null, name: null,email:null, stateChange:false }

 export const authSlice = createSlice({
    name: 'auth',
    initialState,
     reducers: {
         updateUserProfile: (state, { payload }) => ({ ...state, userId: payload.userId, name:payload.name, email:payload.userEmail }),
         authSetChange: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),
     authLogOut:()=> initialState } 
    
})
