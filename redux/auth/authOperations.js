import db from "../../firebase/config";
import { authSlice } from "./authReducer"

const {updateUserProfile, authLogOut,authSetChange} = authSlice.actions


export const authSignUp = ({ email, password, name }) => async (dispatch, getState) => { 
    
     try {
         await db.auth().createUserWithEmailAndPassword(email, password);
         const user = await db.auth().currentUser;
         await user.updateProfile({ displayName: name });
         const {uid, displayName} = await db.auth().currentUser;
         
         dispatch(updateUserProfile({userId:uid, name:displayName, userEmail:email}))
        
        
    } catch (error) {
        console.log("Sign up error", error),
            console.log("sign up error.message", error.message)
        
    }
} 


 export const authSignIn = ({ email, password }) => async (dispatch, getState) => {   try {
     const { user } = await db.auth().signInWithEmailAndPassword(email, password);

     console.log('user: ', user);
     const { uid, displayName } = user;
     
     
      dispatch(updateUserProfile({userId:uid, name:displayName, userEmail:email}))
        
        
    } catch (error) {
        console.log("Sign up error", error),
            console.log("sign up error.message", error.message)
        
    }}



export const authSignOut = () => async (dispatch, getState) => { 
    await db.auth().signOut();
    dispatch(authLogOut())
}

export const authStateChangeUser = () => async (dispatch, getState) => {
    await db.auth().onAuthStateChanged((user) => {
        if (user) {
            const userUpdateProfile = { name: user.displayName, userId: user.uid };
            dispatch(updateUserProfile(userUpdateProfile));
            dispatch(authSetChange({ stateChange: true }));
}
    })
}


