import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: null, name: null,email:null, stateChange:false, avatURL:null }

 export const authSlice = createSlice({
    name: 'auth',
    initialState,
     reducers: {
         updateUserProfile: (state, { payload }) => ({ ...state, userId: payload.userId, name:payload.name, email:payload.userEmail, avatURL:payload.avatURL}),
         authSetChange: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),
         authLogOut: () => initialState,
     changeAvatarPhoto:(state,{payload})=>({...state, avatURL:payload.avatURL})} 
    
})

