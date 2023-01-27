import { auth} from "../../firebase/config";
import { authSlice } from "./authReducer";
// import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile,signOut, onAuthStateChanged} from "firebase/auth";

const {updateUserProfile, authLogOut,authSetChange} = authSlice.actions


export const authSignUp = ({ email, password, name }) => async (dispatch, getState) => { 
    
     try {
        const {user}=  await createUserWithEmailAndPassword(email, password);
        
         await updateProfile(auth.currentUser,{ displayName: name });
         const {uid, displayName} = await auth.currentUser;
         
         dispatch(updateUserProfile({userId:uid, name:displayName, userEmail:email}))
        
        
    } catch (error) {
        console.log("Sign up error", error),
            console.log("sign up error.message", error.message)
        
    }
} 


 export const authSignIn = ({ email, password }) => async (dispatch, getState) => {   try {
     const { user } = await signInWithEmailAndPassword(auth, email, password);

     console.log('user: ', user);
     const { uid, displayName } = user;
     
     
      dispatch(updateUserProfile({userId:uid, name:displayName, userEmail:email}))
        
        
    } catch (error) {
        console.log("Sign up error", error),
            console.log("sign up error.message", error.message)
        
    }}



export const authSignOut = () => async (dispatch, getState) => { 
    await signOut(auth);
    dispatch(authLogOut())
}

export const authStateChangeUser = () => async (dispatch, getState) => {
    await onAuthStateChanged(auth,(user) => {
        if (user) {
            const userUpdateProfile = { name: user.displayName, userId: user.uid, userEmail:user.email};
            dispatch(updateUserProfile(userUpdateProfile));
            dispatch(authSetChange({ stateChange: true }));
}
    })
}


